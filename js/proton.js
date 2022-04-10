
  
//http://www.mikedoesweb.com/2012/creating-your-own-javascript-library/


function $(id) {
	var about = {Version: 0.2,Date: "2014.02.10"};

	if (id) {
		if (window === this) {return new $(id);}
		//this.e = document.getElementById(id);
		var prefix=id[0];
		var iid=id.slice(1,id.length);
		switch (prefix){
			case '#':	this.e = document.getElementById(iid);   			break;
			case '.':	this.e = document.getElementsByClassName(iid);  	break;
			default:	this.e = document.getElementsByTagName(id); 
			}		
		return this;
	} else {
		//
	}
};

/*============================*/
$.prototype = {
	hide: function () {
		this.e.style.display = 'none';
		return this;
	},

	show: function () {
		this.e.style.display = 'inherit';
		return this;
	},

	bgcolor: function (color) {
		this.e.style.background = color;
		return this;
	},

	val: function (newval) {
		this.e.value = newval;
		return this;
	},

	toggle: function () {
		if (this.e.style.display !== 'none') {
			this.e.style.display = 'none';
		} else {
			this.e.style.display = '';
		}
		return this;
	},

	size: function (height, width) {
		this.e.style.height = height + 'px';
		this.e.style.width = width + 'px';
		return this;
	},

	click: function(callback) {
		this.e.addEventListener('click', callback, false);
		return this;
	},

	css: function (selector,value) {
		this.e.style[selector] = value;
		return this;
	},

	html: function (str) {
		this.e.innerHTML = str;
		return this;
	},

	text: function (str) {
		this.e.textContent = str;
		return this;
	},

	append: function (str) {
		this.e.innerHTML += str;
		return this;
	},

	setCSSstyle :function (key,val) {
		var element = document.createElement("style");
		element.setAttribute('type', 'text/css');
		element.setAttribute('id', 'setCSS');
		element.textContent = key+' {'+ val+'}';
		document.getElementsByTagName("head")[0].appendChild(element);
	},

	installJS :function (jsrc) {
		var element = document.createElement("script");
		var skrypty = document.getElementsByTagName('script')[0];
		element.type = 'text/javascript'; 
		element.async = true; 
		element.src = jsrc;
		//element.setAttribute('onLoad','zapakowany('+r+','+ostatniDOC+')');
		//element.addEventListener("load", zapakowany(r,ostatniDOC), false); 
		//element.setAttribute('type', 'text/css');
		//element.setAttribute('id', 'setCSS');
		//element.textContent = key+' {'+ val+'}';
		//skrypty.parentNode.insertBefore(element, skrypty);
		document.getElementsByTagName("head")[0].appendChild(element);
		
		
		
	},

	each: function (obj) {
		var ile = this.e.length;
		console.log(ile);
		console.log(this.e);
		for (var i=0; i<ile;i++){
			return (this.e[i]);
		}
		return this;
	},



};


/*

				
	loadJSON:	function(url,callback){
					request = new XMLHttpRequest
					request.open('GET', url, true);
					request.send();
					request.onload = function() {
						callback(JSON.parse(this.response));
					}
					request.onerror = function() {
						callback(false);
					}					
				},
				
	loadGET:	function(url,callback){
					request = new XMLHttpRequest;
					request.open('GET', url, true);
					request.send();
					request.onload = function() {
						callback(this.response);
					}
					request.onerror = function() {
						callback(false);
					}		
				},
	sendPOST:	function(url,data,callback){
					request = new XMLHttpRequest;
					request.open('POST', url, true);
					//console.log(data);
					request.send(data);
					request.onload = function() {
					console.log(this);
						callback(this.response);
					}
					request.onerror = function() {
						callback(false);
					}							
				}
}

*/
