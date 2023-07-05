//simple-timer.js:

let timerStart = true;
/*
const myTimer=(d0)=>{
   // get current time
   let d=(new Date()).valueOf();
   // calculate time difference between now and initial time
   let diff = d-d0;
   // calculate number of minutes
   let minutes = Math.floor(diff/1000/60);
   // calculate number of seconds
   let seconds = Math.floor(diff/1000)-minutes*60;
   let myVar = null;
   // if number of minutes less than 10, add a leading "0"
   minutes = minutes.toString();
   if (minutes.length == 1){
      minutes = "0"+minutes;
   }
   // if number of seconds less than 10, add a leading "0"
   seconds = seconds.toString();
   if (seconds.length == 1){
      seconds = "0"+seconds;
   }

   // return output to Web Worker
   postMessage(minutes+":"+seconds);
   
}
*/

const myTimerMS=(d0)=>{
   let d=(new Date()).valueOf();
   let diff = d-d0;
   postMessage("milisek+":"+diff);
}               
if (timerStart){
   // get current time
   let d0=(new Date()).valueOf();
   // repeat myTimerMS(d0) every 1000 ms
   myVar=setInterval(function(){myTimerMS(d0)},1000);
   // timer should not start anymore since it has been started
   timerStart = false;
}
