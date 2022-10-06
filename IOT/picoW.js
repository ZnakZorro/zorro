const $=e=>document.querySelector(e);
const $$=e=>document.querySelectorAll(e);

const installAdds=()=>{
    let html = `
        <button data-val="vol10" onclick="slij(this)">vol10 off</button>
        <button data-val="vol20" onclick="slij(this)">vol20 on </button>
        <button data-val="vol30" onclick="slij(this)">vol 30 </button>
    `
}    
const slij=(ten)=>{
    let url="http://192.168.31.126/";
    let u = "lightoff?";
    console.log(ten);
    console.log(ten.dataset.val);
    let val = ten.dataset.val;
    if (val==="vol20") u = "lighton?";
    fetch(url+u)
    .then(r => {return r.text()})
    .then(tx => {
        console.log(tx);
    })
    .catch(e => {console.log(e)})    
}

document.addEventListener("DOMContentLoaded",function(){
    //$("#diva").style.color="#222";
    //$("#diva").style.backgroundColor="#eee";
    console.log("picoW.js");
    installAdds();
})

