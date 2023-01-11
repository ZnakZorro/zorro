console.log("ws.js")

const go=(n)=>{
    console.log("ws go=",n);
}







const parseINFO=(content)=>{
	//console.log(content);
	let arra = content.split("!");
	let jara = arra.pop();
	//console.log(jara);
	jara = jara.replaceAll(':','":"').replaceAll('{','{"').replaceAll('}','"}')
	//console.log(jara);
	let oobj = JSON.parse(jara);
	//console.log(oobj);
	let ent = Object.entries(oobj)
	ent.forEach((e)=>{
		let elem = Object.entries(e[1]);
		let key = elem[0][0]
		let val = elem[0][1]
		console.log(key,val);
		$("#"+key).innerHTML = key+": "+val;
	})
	console.log("-----------------------------------------");		
}

const getInfo=()=>{
	let u = "http://192.168.31.247/dlna/?n=info"
	fetch(u)
	.then(r => {return r.text()})
	.then(o => {parseINFO(o)})
	.catch(e => {console.log(e)})
}




document.addEventListener("DOMContentLoaded",function(){

let divsy=["tim","pro","vol","bit","khz","kbi","ext","sta","tit"]
console.log(divsy)
let html="";
divsy.forEach((d)=>{
	html+=`<span id="${d}">${d}</span>`;
});
document.querySelector("#infor").innerHTML = html;    
    
    
    
getInfo()
setInterval(getInfo,1*10000);
    
});
