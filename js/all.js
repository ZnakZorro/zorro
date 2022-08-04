


let APPconfig={
	"city": {
		"Szczecin-Dąbie": {
			"name": "Szczecin-Dąbie",
			"lat": "53.3788",
			"lon": "14.666",
			"altitude": "15",
			"id":"2-3083828"
		},
		"Szczecin": {
			"name": "Szczecin",
			"lat": "53.380",
			"lon": "14.662",
			"altitude": "25",
			"id":"2-3083829"
		},
		"Warszawa": {
			"name": "Warszawa",
			"lat": "52.1818",
			"lon": "21.0476",
			"altitude": "90",
			"id":"2-8425827"
		},
		"Żyrardów": {
			"name": "Żyrardów",
			"lat": "52.0031",
			"lon": "20.5585",
			"altitude": "150",
			"id":"2-752967"
		},
		
	}
}
//https://en-gb.topographic-map.com/maps/vje9/Szczecin/

const _$=e=>document.querySelector(e);
const _$$=e=>document.querySelectorAll(e);

    let = _APPcity = localStorage.getItem("APPcity") ? localStorage.getItem("APPcity") : "Dąbie";
    let = _APPid   = localStorage.getItem("APPid")   ? localStorage.getItem("APPid")   : "2-3083828";
console.log("all 44 _APPcity,_APPid)=",_APPcity,_APPid);


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

const showhide=(id)=>{
   let ob = document.getElementById(id);  
   if (ob.style.display==="none") ob.style.display="block"; else ob.style.display="none";
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
	.then(r=>{
		window.location.reload(true);
		console.log(r)
	});
}

let ccc=async(ten)=>{
	await cc();
	console.log(ten);
	if (ten) ten.classList.add("active");
}

/*11111111111111111111111111111*/
let ccONE = async()=>{caches.keys().then((names)=> {for (let name of names) caches.delete(name);})}
let cccONE=async()=>{await ccONE();}
