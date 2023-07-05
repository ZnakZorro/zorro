//simple-timer.js:

let timerStart = true;

const myTimerMS=(d0)=>{
   let d=(new Date()).valueOf();
   let diff = d-d0;
   postMessage(diff);
}               
if (timerStart){
   // get current time
   let d0=(new Date()).valueOf();
   // repeat myTimerMS(d0) every 1000 ms
   myVar=setInterval(function(){myTimerMS(d0)},1000);
   // timer should not start anymore since it has been started
   timerStart = false;
}
