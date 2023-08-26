console.log("git iot goPayer 2");

const installHTML=(u,id)=>{
    console.log(outURL,id,u);
    fetch(u)
    .then(r => {return r.text()})
    .then(o => {
        //console.log(o)
        $("#"+id).innerHTML+=o;
    })
    .catch(e => {console.log(e)})    
}

let app = document.querySelector("#app");
//app.innerHTML += ``;
//---dom ready--------------------------------
document.addEventListener("DOMContentLoaded",function(){
    outURL='/';
    installHTML("https://znakzorro.github.io/zorro/IOT/jplayer/upload.html","app");
    installHTML("https://znakzorro.github.io/zorro/IOT/jplayer/index.html","app");
    //installHTML("https://znakzorro.github.io/zorro/IOT/jplayer/edit.html","app");
    /*
    let u="https://znakzorro.github.io/zorro/IOT/jplayer/index.html"    
    fetch(u)
    .then(r => {return r.text()})
    .then(o => {
        console.log(o)
        $("#app").innerHTML+=o;
        installHTML("https://znakzorro.github.io/zorro/IOT/jplayer/edit.html","app");
    })
    .catch(e => {console.log(e)})    
    */
})
//---DOM READY----------------------------------

const edit=(ten)=>{
    console.log(ten.textContent);
    postData("./load", {file: ten.textContent}).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });

}

const save=(ten)=>{
    if(ten){
        console.log(ten.textContent);
        postData("./indexHTML", "zapis index.html").then((data) => {
          console.log(data); // JSON data parsed by `data.json()` call
        });
    } else {
        return;
    }
}


// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.text(); // parses JSON response into native JavaScript objects
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
