const $=e=>document.querySelector(e);
const $$=e=>document.querySelectorAll(e);

const installAdds=()=>{
    let html = `
        <button data-val="vol10" onclick="slij(this)">V:10</button>
        <button data-val="vol10" onclick="slij(this)">V:20</button>
        <button data-val="vol20" onclick="slij(this)">V:25</button>
        <button data-val="vol30" onclick="slij(this)">V:30</button>
        <button data-val="vol40" onclick="slij(this)">V:40</button>
        <hr />
        <button data-val="on" onclick="slij(this)">Led ON</button>
        <button data-val="off" onclick="slij(this)">Led OFF</button>
    `;
    $("#keys").innerHTML = html;
    
    html = `<h3>picoW</h3>`;
    $("#pico").innerHTML = html;
}

const slij=(ten)=>{
    let url="http://192.168.31.126/";
    let u = "off";
    console.log(ten);
    console.log(ten.dataset.val);
    let val = ten.dataset.val;
    if (val==="vol20") u = "on";
    fetch(url+u)
    .then(r => {return r.text()})
    .then(tx => {
        console.log(tx);
        $("#pico").textContent = tx;
        let obj=JSON.parse(tx);
        if (obj){
            console.log(obj);
            let html =""
            for (const property in obj[0]) {html+=`<p>${property}: ${obj[0][property]}</p>`;}
            console.log(html);
            $("#pico").innerHTML = html;
        }
    })
    .catch(e => {console.log(e)})    
}

document.addEventListener("DOMContentLoaded",function(){
    //$("#diva").style.color="#222";
    //$("#diva").style.backgroundColor="#eee";
    console.log("picoW.js");
    installAdds();
})

