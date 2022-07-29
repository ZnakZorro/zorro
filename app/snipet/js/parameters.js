
let url = new URLSearchParams(window.location.search).get("url");
 

function getURLParameter(name) {
	return decodeURIComponent(
		(location.search.match(RegExp("[?|&]"+name+'=(.+?)(&|$)'))||[,null])[1]
	);
}

var uri_enc = encodeURIComponent(uri);
var uri_dec = decodeURIComponent(uri_enc);

location.hash = "strona"


------------------
const urlParams = new URLSearchParams("?post=1234&action=edit");

console.log(urlParams.has('post')); // true
console.log(urlParams.get('action')); // "edit"
console.log(urlParams.getAll('action')); // ["edit"]
console.log(urlParams.toString()); // "?post=1234&action=edit"
console.log(urlParams.append('active', '1')); // "?post=1234&action=edit&active=1"

