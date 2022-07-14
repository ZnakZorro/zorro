
class GreetingMessage extends HTMLElement {
	constructor () {
		super();
		let btnText = this.innerHTML.trim();
		let link = this.hasAttribute('link') ? this.getAttribute('link') : '';
		console.log("______link=",link);
		this.innerHTML =
`<!--p>
		appMenu
		<button>${this.hasAttribute('wave') ? '~' : '?'} ${btnText ? btnText : 'Hi there!'}</button>
	</p--!>
	<div class="message" aria-live="polite"></div>
<header class="header">
	<nav class="navbar">            
		<img id="logo" src="https://znakzorro.github.io/zorro/css/icon/refresh.svg" onClick="refresh()" class="icon1 loader"/>
		<img src="https://znakzorro.github.io/zorro/css/icon/back.svg" onclick="window.location.href='https://znakzorro.github.io/zorro/';" style="width:38px;vertical-align: middle; cursor:pointer;">
		<a href="https://github.com/ZnakZorro/zorro" class="nav-logo">gitZorro <span id="licznik"></span><span id="flag"></span></a>
			<ul class="nav-menu">
			<li class="nav-item"><a href="${this.hasAttribute('link') ? '../../' : ''}app/waluty/index.html" class="nav-link">WALUTY</a></li>
			<li class="nav-item"><a href="${this.hasAttribute('link') ? '../../' : ''}app/covid/index.html" class="nav-link">COVID</a></li>
			<li class="nav-item"><a href="${this.hasAttribute('link') ? this.getAttribute('link') : ''}app/todo/index.html" class="nav-link">ToDo</a></li>
			<li class="nav-item"><a href="html/index.html" class="nav-link">Inne</a></li> 
			<li class="nav-item"><a href="html/zapis.html" class="nav-link">Zapis</a></li>
			<li class="nav-item"><a href="app/dustin/" class="nav-link">dustIN</a></li>
			<li class="nav-item"><a href="app/radio/index.html" class="nav-link">LINKI</a></li>   
			<li class="nav-item"><a href="https://znakzorro.github.io/github-page-pwa/" class="nav-link" target="_blank">T2</a></li>
			<li class="nav-item"><a href="app/admin/index.html" class="nav-link">Admin</a></li>
		</ul>
		<div class="hamburger">
			<span class="bar"></span>
			<span class="bar"></span>
			<span class="bar"></span>
		</div>
	</nav>
</header>			
`;
	}

	clickHandler (event) {
		let host = event.target.closest('app-menu');
		let target = host.querySelector('.message');
		if (!target) return;
		let name = host.getAttribute('name');
		target.textContent = `Hi there, ${name ? name : 'friend'}! Hope you're having a great day!`;
		setTimeout(function () {
			target.textContent = '';
		}, 15000);
	}

	connectedCallback () {
        console.log(this)
        console.log(this.dataset)
        console.log(this.dataset.link)
        console.log(this.title)
		let btn = this.querySelector('button');
		if (!btn) return;
		btn.addEventListener('click', this.clickHandler);
	}

	disconnectedCallback () {
		let btn = this.querySelector('button');
		if (!btn) return;
		btn.removeEventListener('click', this.clickHandler);
	}

	static get observedAttributes () {
		return ['logout'];
	}

    /**
	 * Runs when the value of an attribute is changed on the component
	 * @param  {String} name     The attribute name
	 * @param  {String} oldValue The old attribute value
	 * @param  {String} newValue The new attribute value
	 */
	attributeChangedCallback (name, oldValue, newValue) {
		let btn = this.querySelector('button');
		if (btn) {
			btn.removeEventListener('click', this.clickHandler);
			btn.remove();
		}

		let target = this.querySelector('.message');
		if (target) {
			// Inject the message into the UI
			let name = this.getAttribute('name');
			target.textContent = `Bye, ${name ? name : 'friend'}! See you next time.`;
		}
	}
}

if ('customElements' in window) {
	customElements.define('app-menu', GreetingMessage);
}

let greeting = document.querySelector('app-menu');

greeting.setAttribute('hello', 'you');

setTimeout(function () {
    greeting.setAttribute('logout', true);
}, 15000);






///////////++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
document.addEventListener("my-custom-event", function (event) {
    console.log(event.detail);
  });
  
  // Create the event
  let event = new CustomEvent("my-custom-event", {
    bubbles: true,
    cancelable: true,
    detail: "This is awesome. I could also be an object or array."
  });
  
  // Emit the event
  document.dispatchEvent(event);
  
