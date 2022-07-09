console.log("dust_remote.js");

const $=e=>document.querySelector(e);
const $$=e=>document.querySelectorAll(e);

let elem = document.createElement('div');
elem.style.cssText = "padding:0.25em;background:#006; color:#fff";
elem.innerHTML = "<p>dust_remote.js</p>";
document.body.appendChild(elem);


//---dom ready--------------------------------
document.addEventListener("DOMContentLoaded",function(){
    $("#chart-container").style.width = "100%";
    $("div.highcharts-container").style.width = "100%";
    $("svg").style.width = "100%";
    $("svg").width = "100%";
})
//---DOM READY----------------------------------
