let urlServ = "http://192.168.31.140:3009";

const $=e=>document.querySelector(e);
const $$=e=>document.querySelectorAll(e);
const upFirst=(str)=>str.charAt(0).toUpperCase() + str.slice(1);
const gototop=()=>{window.scrollTo({top: 150,left: 0,behavior: 'smooth'});}
const fotobottom=()=>{document.documentElement.scrollTop = document.documentElement.scrollHeight;}
const JSON_parse=(str)=>{try {return JSON.parse(str);} catch (e) {return null;}}

const dateDayName=(minute=null)=>{
    let pad=(s)=>("0"+s).slice(-2);
    let d = new Date();
    let rok     = d.getFullYear(); 
    let miesiac = pad(d.getMonth()+1);
    let dzien   = pad(d.getDate());
    	let m=parseInt(d.getMinutes());
    	let mint15 = Math.round(Math.round(m/15)*15);
	let minuta  = pad(d.getMinutes());
	let godzina  = pad(d.getHours());
	let out = rok+'_'+miesiac+'_'+dzien;
	if (minute) out += '-'+godzina+'_'+mint15;
    return out;
}

const imgReady=(ten)=>{
    console.log(ten)
}

const dw=(date)=>{
	const weekdays = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
	const weekdayy = ["nie", "pon", "wto", "śro", "czw", "pią", "sob"];
	let td = new Date(date);
	let dw = td.getDay();
	return weekdayy[dw]
}
const zeroPad = (num, places=2) => String(num).padStart(places, '0');

const formatBytes=(bytes,decimals=2)=> {
   if(bytes == 0) return '0 Bytes';
   var k = 1024,
       dm = decimals || 2,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const isAudio=(s)=> /\.(flac|wav|mp3|mp4)$/i.test(s);
const isImage=(s)=> /\.(jpg|jpeg|png|gif|webp)$/i.test(s);

const temu=(created)=>{
	const pad =(s)=>("0"+s.toString()).slice(-2);
	let dateCreat = Date.parse(created);
	let time = (new Date(dateCreat)).getTime();
	let now = Date.now();
	let delta = Math.round((now-time)/60000);
	let mm = Math.floor(delta % 60)
	let hh = Math.floor(delta / 60)
	return pad(hh)+"h "+pad(mm)+"m";
}

const setActive=(ten)=>{
      let parent = ten.parentElement;
      let keys   = parent.querySelectorAll("button");
      keys.forEach(key=>key.classList.remove("active"));
      ten.classList.add("active");
}


let topText=(txt)=>{
	//console.log(txt)
	let am = document.querySelector('app-menu').shadowRoot;
	am.querySelector('#top').textContent = txt;
}




let getAsyncFetch=async(u,callback=null,ten=null)=>{
	if (ten) setActive(ten)
	//console.log(urlServ+u)
	const config = {
	headers: {'Accept':'application/json'}
	}
	const res = await fetch(urlServ+u,config)
	const data = await res.json()
	//console.log(data);
	if (callback) callback(data);
}
 
let getAsyncFetchText=async(u,callback=null)=>{
	const config = {
	//headers: {'Accept':'application/json'}
	}
	const res = await fetch(urlServ+u,config)
	const data = await res.text()
	//console.log(data);
	if (callback) callback(data);
}

let getFetch=async(u,callback=null,ten=null)=>{
	if (ten) setActive(ten)
	const config = {mode: "cors",headers: {'Accept':'application/json'}}
	const res = await fetch(u,config)
	const data = await res.json()
	if (callback) callback(data);
}


function log() {
	var line = Array.prototype.slice.call(arguments).map(function(argument) {
		return typeof argument === 'string' ? argument : JSON.stringify(argument);
	}).join(' ');
	console.log(line);
	document.querySelector('#log').textContent += line + '\n';
}

const logo=(...arg)=>{
	console.log(arg);
	let line=arg.join("; ");
	document.querySelector('#log').textContent += line + '\n';
}






