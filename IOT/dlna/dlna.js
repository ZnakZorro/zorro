console.log("dnla.js")
const $=e=>document.querySelector(e);
const $$=e=>document.querySelectorAll(e);

const go=(n)=>{
    console.log(n);
}
const dlnaParser=(event)=>{
    console.log("moje===",event);   
}

//---dom ready--------------------------------
document.addEventListener("DOMContentLoaded",function(){
    $("#plus").style.color="#008";
    $("#plus").style.backgroundColor="#880";
let u="https://znakzorro.github.io/zorro/IOT/dlna/dlna.html"    
fetch(u)
.then(r => {return r.text()})
.then(o => {
    console.log(o)
    $("#plus").innerHTML=o;
})
.catch(e => {console.log(e)})    
    
})
//---DOM READY----------------------------------
