console.log("dust_remote.js");

const $=e=>document.querySelector(e);
const $$=e=>document.querySelectorAll(e);

let elem = document.createElement('div');
elem.id="info";
elem.style.cssText = "padding:0.25em;background:#006; color:#fff";
elem.innerHTML = "<p>dust_remote.js</p>";
document.body.appendChild(elem);

//---dom ready--------------------------------
document.addEventListener("DOMContentLoaded",function(){
        $("#chart-container").style.width = "100%!important";
        $("div.highcharts-container").style.width = "100%!important";
        $("svg").style.width = "100%!important";
        $("svg").width = "100%!important";
    
    setTimeout(()=>{
        console.log("dust_remote.js 16");
        $("#info").innerHTML = "timeOut dust_remote.js 16s";
        $("#chart-container").style.width = "100%!important";
        $("div.highcharts-container").style.width = "100%!important";
        $("svg").style.width = "100%!important";
        $("svg").width = "100%!important";
        
    },16000)
})
//---DOM READY----------------------------------
