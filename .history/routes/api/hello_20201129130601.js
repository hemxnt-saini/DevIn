import React,{useState} from 'react';
let newI=0;
const [loopI,setI] = useState(0);

const step = () =>{
    setInterval(()=>{
        some1();
    },1000);
}

const some1 = ()=>{
    setI(pre => pre + 1);
    console.log("LoopI", loopI);
    console.log("newI", newI);
    newI++;
}


