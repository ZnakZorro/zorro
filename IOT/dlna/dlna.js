console.log("dnla.js")
const $=e=>document.querySelector(e);
const $$=e=>document.querySelectorAll(e);

const go=(n)=>{
    console.log(n);
}

        
const dlnaDisplay=(name,obj)=>{
    console.log("name=",name)
    console.log("obj=",obj)
}


const dlnaParser=(event)=>{
    console.log("moje===",event);  
    let sMsg = event.data
    console.log("#11 sMsg=",sMsg)
    let arr = sMsg.split("=");
    
    if arr.length==2){
        msg=arr[0]
        txt=arr[1]
        obj = JSON.parse(txt);
        dlnaDisplay(name,obj)
    } else {
        console.log(arr);
    }
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
