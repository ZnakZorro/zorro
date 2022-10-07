const $=e=>document.querySelector(e);
const $$=e=>document.querySelectorAll(e);

const installAdds=()=>{
    let html = `
        <button data-val="vol:10" onclick="slij(this)">V:10</button>
        <button data-val="vol:15" onclick="slij(this)">V:15</button>
        <button data-val="vol:20" onclick="slij(this)">V:20</button>
        <button data-val="vol:25" onclick="slij(this)">V:25</button>
        <button data-val="vol:30" onclick="slij(this)">V:30</button>
        <button data-val="vol:40" onclick="slij(this)">V:40</button>
        <hr />
        <button data-val="pre:1" onclick="slij(this)">A</button>
        <button data-val="pre:2" onclick="slij(this)">B</button>
        <button data-val="pre:3" onclick="slij(this)">C</button>
        <hr />
        <button data-val="led:on" onclick="slij(this)">Led ON</button>
        <button data-val="led:off" onclick="slij(this)">Led OFF</button>
        <button data-val="sys:reset" onclick="slij(this)">Reset</button>
    `;
    $("#keys").innerHTML = html;
    
    html = `<h3>picoW</h3>`;
    $("#pico").innerHTML = html;
}

const slij=(ten)=>{
    let url="http://192.168.31.126/";
    //let u = "off";
    console.log(ten);
    console.log(ten.dataset.val);
    let u = ten.dataset.val;
    //if (val==="vol20") u = "on";
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

