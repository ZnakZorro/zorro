let installScripts = (urls,callback=null)=>{
    let script = document.createElement('script');
    script.onload = function () {
    urls.shift();
        if (urls.length>0) installScript(urls,callback=null);
        else if (callback) callback();
    };
    script.src = urls[0];
    document.head.appendChild(script);
}
