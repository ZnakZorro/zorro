console.log("dnla.js")
const $=e=>document.querySelector(e);
const $$=e=>document.querySelectorAll(e);

const go=(n)=>{
    console.log(n);
}

        
const dlnaDisplay=(key,val)=>{
    let pos = key.indexOf("Level");
    let czas = (new Date()).toLocaleString();
    $("#qtime").innerHTML = czas;
    console.log("------------ key=",key);    
    console.log("------------ val=",val);
    console.log("------------ pos=",pos);
    $("#q"+key).innerHTML = val;
    
    $("#qkey").innerHTML = "";
    $("#qval").innerHTML = "";
    if(key) $("#qkey").innerHTML = key;
        let obj={}
        if(pos==0) obj=JSON.parse(val);
        console.log(obj);
    
    if(val) $("#qval").innerHTML = val;
    
    if (key=="DLNA_Names") $("#qserver").innerHTML = val;
}


const dlnaParser=(event)=>{
    console.log("moje===",event);  
    let sMsg = event.data
    console.log("#11 sMsg=",sMsg)
    let arr = sMsg.split("=");
    console.log(arr);
    let msg0="";
    let msg1=""
    if (arr[0])   msg0=arr[0];
    if (arr[1])   msg1=arr[1];
    dlnaDisplay(msg0,msg1)
}

//---dom ready--------------------------------
document.addEventListener("DOMContentLoaded",function(){
    //$("#plus").style.color="#008";
    //$("#plus").style.backgroundColor="#880";
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
