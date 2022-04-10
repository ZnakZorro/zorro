
console.log("==================cytaty.js");

document.addEventListener("DOMContentLoaded",function(){
    
    fetch("./data/cytaty.txt")
    .then(r => {return r.text()})
    .then(txt => {
        console.log(txt);
        let arr = txt.split("\n");
        console.log(arr,arr.length);
        let los = Math.ceil(Math.random() * (arr.length-1));
        let elem = document.createElement("div");
        let cytat = arr[los];
        console.log(los,cytat);
        elem.style.cssText = "font-weight: 400; font-style: italic; font-size: 1.1rem; color:#800";
        elem.className = "container";

        elem.innerHTML = "cytat: "+cytat;
        if (cytat) document.body.appendChild(elem);  
    })
    .catch(e => {console.log(e)})
    
}); // EOF DOM ready
