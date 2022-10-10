let workingState = true;

const czas=()=> (new Date()).toLocaleString();

const startSimulation=()=>{
    workingState = true
    console.log("visible",czas(),workingState)
};    
const pauseSimulation=()=>{
    workingState = !true
    console.log("hidden ",czas(),workingState)
};    


function handleVisibilityChange() {
  if (document.visibilityState === "hidden") {
      pauseSimulation();
  } else {
      startSimulation();
  }
}

document.addEventListener("visibilitychange", handleVisibilityChange, false);
