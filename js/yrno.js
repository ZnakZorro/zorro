console.log("yrno.js");
let urlYRNO = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=53.378773&lon=14.665842&altitude=25";

const getYRNO=(url)=>{  
  fetch(url)
    .then(function(response) {
          if (!response.ok) {throw Error(response.statusText);}
          return response.json();
    })
    .then(obj => {
        opisYRNO(obj);
    })
    .catch(e => {console.log(e)})
};

const symbolTR=(tx)=>{
  tx = tx.charAt(0).toUpperCase() + tx.slice(1);
  tx = tx.split("_")[0];
  //tx = tx.replaceAll("_"," ");
  return tx;
}

const opisYRNO=(obj)=>{
  let container = document.querySelector("div.container");
  console.log(obj);
  let updated_at = obj.properties.meta.updated_at;
  console.log(updated_at);
  let data = obj.properties.timeseries;
  console.log(data);
  let teraz = data[0].data.instant.details;
  let next01 = data[0].data.next_1_hours;
  let next06 = data[0].data.next_6_hours;
  let next12 = data[0].data.next_12_hours;
  console.log(teraz);
  console.log(next01.summary.symbol_code);
  console.log(next06);
  console.log(next12);
  let html = '<!--pogoda-->';
  html += '<div class="grid">';
    html += '<span>'+symbolTR(next01.summary.symbol_code)+'</span>';
    html += '<span>'+symbolTR(next06.summary.symbol_code)+'</span>';
    html += '<span>'+symbolTR(next12.summary.symbol_code)+'</span>';
  html += '</div>';
  container.insertAdjacentHTML('afterbegin', html);
  //newDiv.innerHTML += ;
  
}

document.addEventListener("DOMContentLoaded",function(){
    getYRNO(urlYRNO);
});
