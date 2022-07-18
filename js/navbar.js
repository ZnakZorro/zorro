document.addEventListener("DOMContentLoaded",function(){
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    console.log(hamburger);
    if (hamburger) hamburger.addEventListener("click", mobileMenu);
    if (navLinks)   navLinks.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

});

/*
let getTimeToken = ()=>{return(new Date()).getTime();}

let refresh=async()=>{
	await cc();
	window.location.href="./";//?token="+getTimeToken();
}
*/
let cc = async()=>{
	caches.keys()
	.then((names)=> {
		console.log(names)
    for (let name of names)
		caches.delete(name);
	})
	.then(r=>{console.log(r)});
}

let ccc=async()=>{
	await cc();
	
}

document.addEventListener("DOMContentLoaded",function(){
	let elem = document.createElement("div");
	elem.className="btns";
        elem.innerHTML = '<button onclick="ccc()">ClearCache</button>';
        document.body.appendChild(elem);  
})
