    const $  = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

const _$=e=>document.querySelector(e);
const _$$=e=>document.querySelectorAll(e);



//---dom ready--------------------------------
document.addEventListener("DOMContentLoaded",function(){
  if (localStorage.getItem("pastetxtx")){
   let str = localStorage.getItem("pastetxtx");
    document.getElementById("txtx").value = str;
  }
})
//---DOM READY----------------------------------
    const PasteTXT=async()=>{
        let txtx = document.getElementById("txtx");
        txtx.value="";
        txtx.style.height="20em";
        const text = await navigator.clipboard.readText();
        txtx.value = text;
    }
    const CopyTXT=()=>{
        let txtx = document.getElementById("txtx");
        txtx.select();
        navigator.clipboard.writeText(txtx.value);
      localStorage.setItem("pastetxtx", txtx.value);
    }
