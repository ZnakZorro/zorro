

const setBtnActive=(ten)=>{
    if(!ten?.parentElement) return;
    let parent = ten.parentElement;
    let keys   = parent.querySelectorAll("button");
    keys.forEach(key=>key.classList.remove("active"));
    ten.classList.add("active");
}

const clearAllActive=(ten=null)=>{
    if (ten) {
        let parent = ten.parentElement;
        parent.querySelectorAll(".active").forEach((d)=>{d.classList.remove("active"); });
    } else {
        document.querySelectorAll(".active").forEach((d)=>{d.classList.remove("active")});
    }
}

const setBtnsEvent=(divid,callback)=>{
    document.querySelectorAll("#"+divid+" button").forEach((btn)=>{
        btn.addEventListener("click",(e)=>{
            if (callback) callback(e.target,e.target.dataset)
        })
    })
}


const addcss=(css)=>{
    let head = document.getElementsByTagName('head')[0];
    let s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    if (s.styleSheet) {   // IE
        s.styleSheet.cssText = css;
    } else {                // the world
        s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);
}

const installButtono=(arra,id,callback,prepare=null)=>{
    let div = document.getElementById(id);
    div.innerHTML = "";
    arra.forEach((val,i)=>{
        let txt = prepare ? prepare(val): val;
        let btn = document.createElement("button");
        btn.id = "btn-"+i;
        btn.dataset.val = val;
        btn.textContent = txt;
        btn.addEventListener('click', ()=>{callback(btn,val)}, false); 
        div.appendChild(btn);
    });        
}

    /*const installButtons=(arra,id,callback,prepare=null)=>{
        let html = "";
        arra.forEach((note,i)=>{
            let txt = prepare ? prepare(note): note;
            html += `<button id="btn-${i}" data-val="${note}" title="${note}">${txt}</button>`;
        });
        document.getElementById(id).innerHTML = html;
        document.querySelectorAll("#"+id+" button").forEach((btn,nr)=>{
            btn.addEventListener("click",(e)=>{
                callback(e.target,e.target.dataset.val);
            });            
        });
    }*/
    
const setBTNstyle=()=>{
    let btnStyle=`
        label, button, .btn {
        background: #f0f0f0;
        color:black;
        border: 1px solid #999;
        border-radius: 0.33em;
        display: inline-block;
        margin: 0.4em 0.3em;
        padding: 0.4em 0.2em;
        text-align: center;
        min-width: 4em;
    }
    .active {background:red;color:white;}
    `;
    addcss(btnStyle);
}

export {setBTNstyle, setBtnActive, clearAllActive, installButtono, setBtnsEvent};