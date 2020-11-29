let newI=0;
let loopI =0; 

const step = () =>{
    setInterval(()=>{
        some1();
    },1000);
}

const some1 = ()=>{
    console.log("LoopI", loopI);
    console.log("newI", newI);
    loopI++;
    newI++;
}

step();