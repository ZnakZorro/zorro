let installScripts = (urls,callback=null)=>{
    let script = document.createElement('script');
    script.onload = function () {
    urls.shift();
        if (urls.length>0) installScript(urls,callback=null);
        else if (callback) callback();
    };
    script.src = urls[0];
    document.head.appendChild(script);
}

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
