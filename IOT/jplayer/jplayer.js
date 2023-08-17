console.log("git iot jpayer");
let app = document.querySelector("#app");
app.innerHTML += `
<h2>jPlayer from js</h2>
<button onclick="./">/self</button>
<button onclick="outURL = "http://192.168.31.145/">/jPlayer</button>
`;
//---dom ready--------------------------------
document.addEventListener("DOMContentLoaded",function(){
let u="https://znakzorro.github.io/zorro/IOT/jplayer/index.html"    
fetch(u)
.then(r => {return r.text()})
.then(o => {
    console.log(o)
    $("#app").innerHTML+=o;
})
.catch(e => {console.log(e)})    
    
})
//---DOM READY----------------------------------
