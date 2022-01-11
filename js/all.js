
const backFromAPP=()=>{window.location.href="../../";}

let getToken = ()=>{return(new Date()).getTime();}


/*
//clear cache
let cccc=async()=>{
	await cc();
	
}

let refresh=async()=>{
	await cc();
	window.location.href="./";//?token="+getToken();
}

let cc = async()=>{
	caches.keys()
	.then((names)=> {
		console.log(names)
    for (let name of names)
		caches.delete(name);
	})
	.then(r=>{console.log(r)});
}
*/