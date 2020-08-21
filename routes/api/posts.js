const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route POST api/posts
//@desc Create a post
//@access Private

router.post(
  "/",
  [auth, [check("text", "Title is required..").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/posts
//@desc Get all posts
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api/posts/:id
//@desc Get posts by id
//@access Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId  ") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route DELETE api/posts/:id
//@desc   Dwlwtw a post
//@access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    //Check USER
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User Not Authorised" });
    }
    await post.remove();
    res.json({ msg: "Post Removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

//@route PUT api/posts/like/:id
//@desc   Like a post
//@access Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if the user already liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post Already Liked" });
    }
    //If haven't Liked..
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/posts/unlike/:id
//@desc   Like a post
//@access Private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if the user not liked the post..!!(no reason to dislike)
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been Liked" });
    }

    //get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/posts/comment/:id(id of post to comment on)
//@desc  Comment on  post
//@access Private

router.post(
  "/comment/:id",
  [auth, [check("text", "Text  is required..").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment); //wanna add to the beggining
      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE api/posts/comment/:id/:comment_id(FOR THIS CASE we want both id of post and commentID to be delete )
//@desc  DELETE Comment on  post
//@access Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //find out comment to be deleted using cID
    //const comment = await post.comments.findById(req.params.comment_id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //Make suire comment exist
    if (!comment) {
      return res.status(404).json({ msg: "Comment Not Found" });
    }

    //check user(is this the right user who made that comment only he allows to de;lete the comment)
    if (comment.user.toString() !== req.user.id) {
      //req.user.id here means the login user
      return res.status(401).json({ msg: "User not authorized" });
    }

    //get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
