const toggle = ele => (ele.style.display = (ele.style.display === 'none') ? 'block' : 'none');
const insertAfter = (ele, anotherEle) => anotherEle.insertAdjacentElement('afterend', ele);
const stripHtml = html => (new DOMParser().parseFromString(html, 'text/html')).body.textContent || ''
let striper = stripHtml("halo halo");
console.log(striper);


let container = document.querySelector('nav');
let doc = 'nowy wpis';
container.insertAdjacentHTML('beforeend', doc);
//beforebegin afterbegin beforeend afterend
 

var klawisz = document.createElement('button');
    klawisz.addEventListener('click', modifyText, false); 
document.body.appendChild(klawisz);


var newDiv = document.createElement('div');
    newDiv.setAttribute('data-id','id1'); 
    newDiv.classList.add('foo');
    newDiv.classList.toggle('foo');
    newDiv.addEventListener('click', modifyText, false); 
document.body.appendChild(newDiv);



console.time("jsdiv");
var c = document.createDocumentFragment();
for (var i=0; i<100; i++) {
    var e = document.createElement("div");
    e.className = "test-div";
    c.appendChild(e);
}
document.body.appendChild(c);
console.timeEnd("jsdiv"); 
