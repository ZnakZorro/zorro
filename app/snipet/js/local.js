let val  = JSON.stringify(json);
localStorage.setItem("name", val);
let str = localStorage.getItem("name");
let json = JSON.parse(str);
localStorage.removeItem("name");	



localStorage.setItem("lastname", "Smith");
document.getElementById("result").innerHTML = localStorage.getItem("lastname");

sessionStorage.setItem("lastname", "Smith");
document.getElementById("result").innerHTML = sessionStorage.getItem("lastname");



