

document.querySelector("#home-btn").addEventListener("click", ()=>{location.href="../"});
document.querySelector("#note-btn").addEventListener("click", ()=>{location.href="note.html"});
document.querySelector("#zorro-btn").addEventListener("click", ()=>{location.href="index.html"});
document.querySelector("#mama-btn").addEventListener("click", ()=>{location.href="mama.html"});


document.title=storageName;
document.querySelector("h2").textContent = "Lista "+storageName
