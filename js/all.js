
const _$=e=>document.querySelector(e);
const _$$=e=>document.querySelectorAll(e);

let APPconfig={
	"city": {
		"Dabie": {
			"name": "Szczecin-Dąbie",
			"lat": "53.3788",
			"lon": "14.666",
			"altitude": "25"
		},
		"Szczecin": {
			"name": "Szczecin",
			"lat": "53.380",
			"lon": "14.662",
			"altitude": "25"
		}
	}
}
let APPcity = "Dabie";


const backFromAPP=()=>{window.location.href="../../";}

let getToken = ()=>{return(new Date()).getTime();}

function pad2(s) { return ("0"+s.toString()).slice(-2); }

const dateHM=(date)=>{
  let d = (new Date(date));
  let H = pad2(d.getHours());
  let M = pad2(d.getMinutes());  
  return H+":"+M;
}

const dayL=(time)=>{
  let H = Math.floor(time/3600);
  let M = Math.round((time-(3600*H)) / 60); 
  return pad2(H)+":"+pad2(M);
}



/*******************************/
const canWakeLock = () => 'wakeLock' in navigator;

let wakelock;
lockWakeState=async()=> {
  if(!canWakeLock()) return;
  try {
    wakelock = await navigator.wakeLock.request();
    wakelock.addEventListener('release', () => {
      console.log('Screen Wake State Locked:', !wakelock.released);
    });
    console.log('Screen Wake State Locked:', !wakelock.released);
  } catch(e) {
    console.error('Failed to lock wake state with reason:', e.message);
  }
}

releaseWakeState=()=> {
  if(wakelock) wakelock.release();
  wakelock = null;
}

startlockWakeState=async()=> {
    await lockWakeState();
}

startlockWakeState();
setTimeout(releaseWakeState, 15000);


/*****************************************/
let cc = async()=>{
	caches.keys()
	.then((names)=> {
		console.log(names)
		for (let name of names) caches.delete(name);
	})
	.then(r=>{console.log(r)});
}

let ccc=async()=>{
	await cc();
	
}
