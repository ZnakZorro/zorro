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

//const uid=()=>Math.random().toString(16).slice(8);
//const uid=()=>Date.now().toString();
const uid=()=>getIdDate();

const getIdDate=()=>{
    const now = new Date();

    const Y = now.getFullYear(); // 2026
    const M = String(now.getMonth() + 1).padStart(2, '0'); // Miesiące są od 0 do 11
    const D = String(now.getDate()).padStart(2, '0');
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    return `${Y}${M}${D}${h}${m}${s}`;
}


const akcja=(keyName)=>{
    // 2. Tworzenie elementu badge
    const container = document.getElementById('key-notifier-container');
    const badge = document.createElement('div');
    badge.className = 'key-badge';
    badge.textContent = keyName;

    // 3. Dodanie do DOM
    container.appendChild(badge);

    // 4. Automatyczne usuwanie po zakończeniu animacji (2 sekundy)
    setTimeout(() => {
        badge.remove();
    }, 3000);
}





document.querySelector("#home-btn").addEventListener("click", ()=>{location.href="../"});
document.querySelector("#note-btn").addEventListener("click", ()=>{location.href="note.html"});
document.querySelector("#gamma-btn").addEventListener("click", ()=>{location.href="gamma.html"});
document.querySelector("#beta-btn").addEventListener("click", ()=>{location.href="index.html"});
document.querySelector("#alfa-btn").addEventListener("click", ()=>{location.href="alfa.html"});


document.title=storageName;
document.querySelector("h2").textContent = "Lista "+storageName;
