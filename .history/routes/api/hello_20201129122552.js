let newI=0;
const loopI =0; 

const step = () =>{
    setInterval(()=>{
        some1();
    },1000);
}

const some1 = ()=>{
    loopI++;
    console.log("LoopI", loopI);
    console.log("newI", newI);
    newI++;
}