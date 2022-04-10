fetch("/data/cytaty.txt)
.then(r => {return r.text()})
.then(txt => {
    console.log(txt);
    let arr = txt.split("\n");
    console.log(arr,arr.length);
    let los = Math.round(Math.random()*arr.length);
    let elem = document.createElement("div");
    let cytat = arr[los];
    elem.style.cssText = "color:#800";
    elem.innerHTML = "cytat: "+cytat;
    document.body.appendChild(elem);  
})
.catch(e => {console.log(e)})
