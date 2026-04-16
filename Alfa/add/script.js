
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




// Obsługa Entera
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("Musisz coś wpisać!");
    } else {
        createTaskElement(inputBox.value, false);
        saveData();
    }
    inputBox.value = "";
}

function createTaskElement(text, isChecked) {
    let li = document.createElement("li");
    if (isChecked) li.classList.add("checked");

    let textSpan = document.createElement("p");
    textSpan.innerHTML = text;
    li.appendChild(textSpan);

    let btnContainer = document.createElement("div");

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "✎";
    editBtn.className = "edit-btn";
    btnContainer.appendChild(editBtn);

    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7";
    btnContainer.appendChild(deleteBtn);

    li.appendChild(btnContainer);
    listContainer.appendChild(li);
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "P") {
        e.target.parentElement.classList.toggle("checked");
        saveData();
    } 
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.parentElement.remove();
        saveData();
    }
    else if (e.target.classList.contains("edit-btn")) {
        let p = e.target.parentElement.parentElement.querySelector("p");
        let newText = prompt("Edytuj zadanie:", p.innerHTML);
        
        if (newText !== null && newText.trim() !== "") {
            p.innerHTML = newText;
            saveData();
        }
    }
}, false);



function saveData() {
    localStorage.setItem(storageName, listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem(storageName) || "";
}

showTask();


document.querySelector("#home-btn").addEventListener("click", ()=>{location.href="../"});
document.querySelector("#gamma-btn").addEventListener("click", ()=>{location.href="gamma.html"});
document.querySelector("#note-btn").addEventListener("click", ()=>{location.href="note.html"});
document.querySelector("#beta-btn").addEventListener("click", ()=>{location.href="index.html"});
document.querySelector("#alfa-btn").addEventListener("click", ()=>{location.href="alfa.html"});


document.title=storageName;
document.querySelector("h2").textContent = "Lista "+storageName
