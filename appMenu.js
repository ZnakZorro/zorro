class NavBarNavigator extends HTMLElement {
	constructor () {
		super();
		let link    = this.hasAttribute('link') ? this.getAttribute('link') : '';
		let title   = this.hasAttribute('title') ? this.getAttribute('title') : 'gitZorro';
		let color   = this.hasAttribute('color') ? this.getAttribute('color') : '#482ff7';
		let style   = this.hasAttribute('style') ? this.getAttribute('style') : 'navbar-normal';
		let styl   = this.hasAttribute('style') ? this.getAttribute('style') : 'navbar-normal';
		let APPcity = localStorage.getItem("APPcity") ? localStorage.getItem("APPcity") : "Szczecin na Dąbie";
		if (title==="gitZorro" && APPcity) title=APPcity;
		
		//console.log("______link=",link);
		//console.log("______title=",title);		
		this.attachShadow({ mode: 'open'});
			
		this.shadowRoot.innerHTML = `
		<link href='https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="https://znakzorro.github.io/zorro/css/navbar.css" />		
		<link rel="stylesheet" href="https://znakzorro.github.io/zorro/css/${styl}.css" />
		
		<style>
		.header * {
			font-family: 'Roboto', "Verdana", sans-serif; 
		}  
		
		</style>		
		 <header class="header hidenow">
			 <nav class="navbar">            
				 <img src="https://znakzorro.github.io/zorro/css/icon/back.svg" width="32" onclick="window.location.href='https://znakzorro.github.io/zorro/';" class="icon1">
				 <a href="https://znakzorro.github.io/zorro/" class="nav-logo">${title}<span id="licznik"></span><span id="flag"></span></a>
					 <ul class="nav-menu">
					 <li class="nav-item"><a href="${link}app/waluty/index.html" class="nav-link">WALUTY</a></li>
					 <li class="nav-item"><a href="${link}app/covid/index.html" class="nav-link">COVID</a></li>
					 <li class="nav-item"><a href="${link}app/todo/index.html" class="nav-link">ToDo</a></li>
					 <li class="nav-item"><a href="${link}html/index.html" class="nav-link">Inne</a></li> 
					 <li class="nav-item"><a href="${link}app/EDEK/" class="nav-link">EDEK</a></li>
					 <li class="nav-item"><a href="${link}app/snipet/" class="nav-link">SNIPET</a></li>
					 <li class="nav-item"><a href="${link}html/zapis.html" class="nav-link">Zapis</a></li>
					 <li class="nav-item"><a href="${link}app/radio/index.html" class="nav-link">LINKI</a></li>   
					 <li class="nav-item"><a href="${link}app/admin/index.html" class="nav-link">Admin</a></li>
					 <li class="nav-item"><a href="${link}app/ele/index.html" class="nav-link">Ele</a></li>
					 <li class="nav-item"><a href="${link}app/hash/index.html" class="nav-link red">#</a></li>
					 
					 <!--
					 <li class="nav-item"><a href="${link}app/dustin/" class="nav-link">dustIN</a></li>
					 <li class="nav-item"><a href="https://znakzorro.github.io/github-page-pwa/" class="nav-link" target="_blank">T2</a></li>
					 <li class="nav-item"><a href="${link}vue/index.html" class="nav-link">VUE</a></li>
					 -->
					 
				 </ul>
				 <div class="hamburger" >
					 <span class="bar"></span>
					 <span class="bar"></span>
					 <span class="bar"></span>
				 </div>
			 </nav>
		 </header>			
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

