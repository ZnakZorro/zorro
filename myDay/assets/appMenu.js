class NavBarNavigator extends HTMLElement {
	constructor () {
		super();
		let link    = this.hasAttribute('link') ? this.getAttribute('link') : '../../';
		let title   = this.hasAttribute('title') ? this.getAttribute('title') : 'myDay';
		let top     = this.hasAttribute('top') ? this.getAttribute('top') : title;
		let color   = this.hasAttribute('color') ? this.getAttribute('color') : '#33b5e5';
		let text   = this.hasAttribute('text') ? this.getAttribute('text') : '#fff';
		let hover   = this.hasAttribute('hover') ? this.getAttribute('hover') : '#aaf';
		let border  = this.hasAttribute('border') ? this.getAttribute('border') : '#888';
		let shadow  = this.hasAttribute('shadow') ? this.getAttribute('shadow') : border;
		let styl    = this.hasAttribute('styl') ? this.getAttribute('styl') : 'normal';
		let logo    = this.hasAttribute('logo') ? this.getAttribute('logo') : 'inline';
		let APPcity = localStorage.getItem("APPcity") ? localStorage.getItem("APPcity") : "Szczecin na Dąbie";
		if (title==="gitZorro" && APPcity) title=APPcity;
		let alink = link.replace("../","");
		//console.log("______link=",link);
		//console.log("______alink=",alink);
		console.log("______title=",title,top);
		//console.log("______styl=",styl);
		this.attachShadow({ mode: 'open'});
		document.querySelector('meta[name="theme-color"]').setAttribute('content',  `${color}`);
			
		this.shadowRoot.innerHTML = `
		<link href='https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="${link}assets/css/navbar.css" />		
		<!--link rel="stylesheet" href="${link}assets/css/navbar-${styl}.css" /-->
		<!--link rel="stylesheet" href="${link}assets/css/mdb.css"-->
		
		<style>
		.header * {
			font-family: 'Roboto', "Verdana", sans-serif; 
		}  
  		.line {display:inline;}
  		.nav-logo {background:${color}; color:${text};}
  		.nav-link {color:${text};}
  		.nav-link:hover {color:${hover};}
		@media only screen and (max-width: 768px) {
    			.nav-menu {background:${color}; color:${text};}
    		}
		</style>		
		 <header class="header hidenow" style="background:${color}; color:${text}">
			 <nav class="navbar">            
				 <img src="${link}assets/css/icon/back.svg" width="32" title="history.back()" onclick="history.back();" class="icon1">
				 <a href="${alink}main/index.html" title="main page" class="nav-logo"><span id="logo">${title}</span> <span id="licznik"></span><span id="flag"></span></a>
					<ul class="nav-menu">
						<li class="nav-item"><a href="${alink}main/index.html" class="nav-link">myDay</a></li>
						<li class="nav-item"><a href="${alink}appKA/index.html" class="nav-link">appKA</a></li>
						<li class="nav-item"><a href="${alink}dom/index.html" class="nav-link">DOM</a></li>
						<li class="nav-item"><a href="${alink}todo/index.html" class="nav-link">ToDo</a></li>
						<li class="nav-item"><a href="${alink}hue/index.html" class="nav-link">HUE</a></li>						
						<li class="nav-item"><a href="${alink}texteditor/index.html" class="nav-link">ED</a></li>
						<li class="nav-item"><a href="${alink}pogoda/index.html" class="nav-link">Pogoda</a></li>
						<li class="nav-item"><a href="${alink}ptaki/index.html" class="nav-link">Ptaki</a></li>
						<li class="nav-item"><a href="${alink}Kamienice/index.html" class="nav-link">Kamienice</a></li>
						<li class="nav-item"><a href="${alink}audio/index.html" class="nav-link">Audio</a></li>
						<li class="nav-item"><a href="${alink}audio/mediall/index.html" class="nav-link">MEDIAll</a></li>						
						<li class="nav-item"><a href="${alink}code/index.html" class="nav-link">CODE</a></li>						
						<li class="nav-item"><a href="${alink}ele/index.html" class="nav-link">ELE</a></li>
						<li class="nav-item"><a href="${alink}nas/index.html" class="nav-link">NAS</a></li>
						<li class="nav-item"><a href="${alink}router/index.html" class="nav-link">Router</a></li>
						
				 	</ul>
				<div class="hamburger" >
					<span class="bar"></span>
					<span class="bar"></span>
					<span class="bar"></span>
				</div>
			 </nav>
		 </header>
		 <div id="top" style="display:none"></div>
		 <!--div id="top" class="top blue-top" style="display:${logo}; color:${text}; background:${color};border-color:${border}; box-shadow: 0px 4px 4px ${shadow};">${top}</div-->	
		 <div id="topright" style="position:absolute; top:3em; right:1.5em; cursor:pointer; color:blue"></div>		
		 <div class="message" aria-live="polite"></div>
		 `;		
	}

	connectedCallback () {
		
		const hamburger = this.shadowRoot.querySelector(".hamburger");
		const navMenu   = this.shadowRoot.querySelector(".nav-menu");
		const navLink   = this.shadowRoot.querySelectorAll(".nav-link");
		hamburger.addEventListener("click", mobileMenu);
		navLink.forEach(n => n.addEventListener("click", closeMenu));
		if (document.querySelector(".icon1")){
			document.querySelector(".icon1").classList.add("loader");
			setTimeout(()=>{document.querySelector(".icon1").classList.remove("loader");},1000);
		}

		function mobileMenu() {
			hamburger.classList.toggle("active");
			navMenu.classList.toggle("active");
		}
		
		function closeMenu() {
			hamburger.classList.remove("active");
			navMenu.classList.remove("active");
		}
		setTimeout(()=>{
			//console.log("timeout==",this.shadowRoot,selfRoot);
			//this.shadowRoot.querySelector(".header").classList.remove("hidenow");
			//this.shadowRoot.querySelector(".header").classList.add("shownow");
		},1000);
		
		let selfRoot = this.shadowRoot;
		
		document.addEventListener("DOMContentLoaded",function(){
			//console.log("dom redy this.shadowRoot==",selfRoot);
			selfRoot.querySelector(".header").classList.remove("hidenow");
			selfRoot.querySelector(".header").classList.add("shownow");
		})

	}

}

if ('customElements' in window) {
	customElements.define('app-menu', NavBarNavigator);
}

