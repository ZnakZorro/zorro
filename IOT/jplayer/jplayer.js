console.log("git iot jpayer");

const installHTML=(u,id)=>{
    fetch(u)
    .then(r => {return r.text()})
    .then(o => {
        console.log(o)
        $("#"+id).innerHTML+=o;
    })
    .catch(e => {console.log(e)})    
}

let app = document.querySelector("#app");
app.innerHTML += `
`;
//---dom ready--------------------------------
document.addEventListener("DOMContentLoaded",function(){
    let u="https://znakzorro.github.io/zorro/IOT/jplayer/index.html"    
    fetch(u)
    .then(r => {return r.text()})
    .then(o => {
        console.log(o)
        $("#app").innerHTML+=o;
    })
    .catch(e => {console.log(e)})    
    installHTML=("https://znakzorro.github.io/zorro/IOT/jplayer/index.html","app");
})
//---DOM READY----------------------------------

const edit=(ten)=>{
    console.log(ten);
}

const save=(ten)=>{
    console.log(ten);
}


/*
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    document.head.append(script);
  });
}

loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js")
.then(script => console.log(`${script.src} is loaded!`))
.catch(error => console.log(`Error: ${error.message}`));
*/
