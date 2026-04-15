const inputBox = document.getElementById("todo-input");
const listContainer = document.getElementById("list-container");


const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

// Sprawdź, czy użytkownik miał wcześniej ustawiony tryb ciemny
if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.innerHTML = "☀️";
}

themeToggle.addEventListener("click", function() {
    let theme = document.documentElement.getAttribute("data-theme");
    
    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        themeToggle.innerHTML = "🌙";
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeToggle.innerHTML = "☀️";
    }
});



document.querySelector("#home-btn").addEventListener("click", ()=>{location.href="../"});
document.querySelector("#note-btn").addEventListener("click", ()=>{location.href="note.html"});
document.querySelector("#zorro-btn").addEventListener("click", ()=>{location.href="index.html"});
document.querySelector("#mama-btn").addEventListener("click", ()=>{location.href="mama.html"});


document.title=storageName;
document.querySelector("h2").textContent = "Lista "+storageName
