
console.log("cytaty.js");

fetch("./data/cytaty.txt")
.then(r => {return r.text()})
.then(txt => {
    console.log(txt);
    let arr = txt.split("\n");
    console.log(arr,arr.length);
    let los = Math.ceil(Math.random()*arr.length);
    let elem = document.createElement("div");
    let cytat = arr[los];
    console.log(los,cytat);
    elem.style.cssText = "color:#800";
    elem.innerHTML = "cytat: "+cytat;
    document.body.appendChild(elem);  
})
.catch(e => {console.log(e)})
