
console.log("==================cytaty.js");

const setCytat=()=>{
    fetch("./data/cytaty.txt")
    .then(r => {return r.text()})
    .then(txt => {
        let arr = txt.split("\n");
        let los = Math.ceil(Math.random() * (arr.length-2));
        let elem = document.createElement("div");
        let cytat = arr[los];
        elem.style.cssText = "font-weight: 400; font-style: italic; font-size: 1.05rem; color:#888";
        elem.className = "container";
        elem.innerHTML = '"'+cytat+'"';
        if (cytat) document.body.appendChild(elem);  
    })
    .catch(e => {console.log(e)})    
}

document.addEventListener("DOMContentLoaded",function(){
    setCytat();
    
}); // EOF DOM ready
