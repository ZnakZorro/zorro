const $=e=>document.querySelector(e);
const $$=e=>document.querySelectorAll(e);

const installAdds=()=>{
    let html = `
        <button data-val="info:info" onclick="slij(this)">Info</button>
        <br />
        <button data-val="vol:10" onclick="slij(this)">V:10</button>
        <button data-val="vol:15" onclick="slij(this)">V:15</button>
        <button data-val="vol:20" onclick="slij(this)">V:20</button>
        <button data-val="vol:25" onclick="slij(this)">V:25</button>
        <button data-val="vol:30" onclick="slij(this)">V:30</button>
        <button data-val="vol:35" onclick="slij(this)">V:35</button>
        <button data-val="vol:40" onclick="slij(this)">V:40</button>
        <hr />
        <button data-val="pre:1" onclick="slij(this)">TOK-FM</button>
        <button data-val="pre:2" onclick="slij(this)">RNŚ</button>
        <button data-val="pre:3" onclick="slij(this)">357</button>
        <hr />
        <br /><br /><br />
        <button data-val="led:on" onclick="slij(this)">Led ON</button>
        <button data-val="led:off" onclick="slij(this)">Led OFF</button>
        <button data-val="sys:reset" onclick="slij(this)">Reset</button>
    `;
    $("#keys").innerHTML = html;
    
    html = `<h3>picoW</h3>`;
    $("#pico").innerHTML = html;
}

const slij=(ten=null)=>{
    let url="http://192.168.31.126/";
    let u = "info:info";
    if (ten){
        document.querySelectorAll("#keys button").forEach(b=>b.classList.remove("active"));
        ten.classList.add("active");
        console.log(ten);
        console.log(ten.dataset.val);
        u = ten.dataset.val;
        
    }
    fetch(url+u)
    .then(r => {return r.json()})
    .then(obj => {
        console.log(obj);
        $("#pico").textContent = JSON.stringify(obj);
        let html =""
        obj.forEach((o,i)=>{
            html+=`<p>${i}: ${o}</p>`
        })
        if (obj[6]) html+=`<img src="http://192.168.31.8${obj[6]}" />`
        $("#pico").innerHTML = html;
    })
    .catch(e => {console.log(e)})    
}

document.addEventListener("DOMContentLoaded",function(){
    //$("#diva").style.color="#222";
    //$("#diva").style.backgroundColor="#eee";
    console.log("picoW.js");
    installAdds();
    slij();
    setInterval(slij,10000);
})

