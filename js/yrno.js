console.log("yrno.js");
console.log("https://api.met.no/weatherapi/locationforecast/2.0/");
console.log("https://api.met.no/weatherapi/weathericon/2.0/documentation");

//let gfxSVG = "https://api.met.no/images/weathericons/svg/clearsky_day.svg";
let gfxSVG = "https://api.met.no/images/weathericons/svg/";

let dataType = "complete"; //  compact  complete   classic
//let urlYRNO = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=53.378773&lon=14.665842&altitude=25";
let urlYRNO = "https://api.met.no/weatherapi/locationforecast/2.0/"+dataType+"?lat=53.378773&lon=14.665842&altitude=25"
let yrnoPL={};

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

const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

const symbolTR=(tx)=>{
  tx = tx.split("_")[0];
  return (yrnoPL[tx].pl);
}
const ronda=(tx)=>{
  let int = parseInt(tx);
  return int.toString();
}

const opisYRNO=(obj)=>{
  let container = document.querySelector("div.container");
  console.log(obj);
  let updated_at = obj.properties.meta.updated_at;
  updated_at = (new Date(updated_at)).toLocaleString();
  console.log(updated_at);
  let data = obj.properties.timeseries;
  console.log(data);
  let teraz = data[0].data.instant.details;
  let next01 = data[0].data.next_1_hours;
  let next06 = data[0].data.next_6_hours;
  let next12 = data[0].data.next_12_hours;
  //let rain01 = data[0].data.next_1_hours.details.precipitation_amount ;
  //let rain06 = data[0].data.next_6_hours.details.precipitation_amount;
  //let rain12 = "0";
  //if (data[0].data.next_12_hours.details) rain12 = data[0].data.next_12_hours.details.precipitation_amount;
  let rain01 = (data[0].data.next_1_hours.details?.precipitation_amount)  ? data[0].data.next_1_hours.details.precipitation_amount : "0";
  let rain06 = (data[0].data.next_6_hours.details?.precipitation_amount)  ? data[0].data.next_6_hours.details.precipitation_amount : "0";
  //let rain12 = (data[0].data.next_12_hours.details?.precipitation_amount) ? data[0].data.next_12_hours.details.precipitation_amount : "0";
  let rain12 = (data[0].data.next_12_hours.details?.precipitation_amount) || "0";
   
  
  let temp01 = data[1].data.instant.details.air_temperature || teraz.air_temperature;
  let temp06 = data[6].data.instant.details.air_temperature || teraz.air_temperature;
  let temp12 = data[12].data.instant.details.air_temperature || teraz.air_temperature;

  let press01 = ronda(data[1].data.instant.details.air_pressure_at_sea_level);
  let press06 = ronda(data[6].data.instant.details.air_pressure_at_sea_level);
  let press12 = ronda(data[12].data.instant.details.air_pressure_at_sea_level);
  
  let wind01 = data[1].data.instant.details.wind_speed;
  let wind06 = data[6].data.instant.details.wind_speed;
  let wind12 = data[12].data.instant.details.wind_speed;
  
  let icon_01 = '<img src="'+gfxSVG+next01.summary.symbol_code+'.svg" />';
  let icon_06 = '<img src="'+gfxSVG+next06.summary.symbol_code+'.svg" />';
  let icon_12 = '<img src="'+gfxSVG+next12.summary.symbol_code+'.svg" />';

  let html = '<!--pogoda-->';
  html += '<div class="grid pogoda-1"><small>'+dataType+', '+updated_at+'</small></div>';
  html += '<div class="grid pogoda-1"><b>'+teraz.air_temperature+'&deg;C, '+teraz.air_pressure_at_sea_level+'hPa, '+teraz.wind_speed+'m/s</b></div>';
  html += '<div class="grid pogoda pogoda-3">';
   
    html += '<div>'+icon_01+'<span>'+temp01+'&degC</span><br /><span>'+rain01+'mm</span><br />'+press01+'hPa<br />'+wind01+'m/s<br />'+symbolTR(next01.summary.symbol_code)+'</div>';
    html += '<div>'+icon_06+'<span>'+temp06+'&degC</span><br /><span>'+rain06+'mm</span><br />'+press06+'hPa<br />'+wind06+'m/s<br />'+symbolTR(next06.summary.symbol_code)+'</div>';
    html += '<div>'+icon_12+'<span>'+temp12+'&degC</span><br /><span>'+rain12+'mm</span><br />'+press12+'hPa<br />'+wind12+'m/s<br />'+symbolTR(next12.summary.symbol_code)+'</div>';
  
  html += '</div>';
  container.insertAdjacentHTML('afterbegin', html);
  //newDiv.innerHTML += ;
  
}
/*
air_pressure_at_sea_level: 1004
air_temperature: 7.7
cloud_area_fraction: 80.3
relative_humidity: 89.4
wind_from_direction: 241
wind_speed: 5.2
*/

document.addEventListener("DOMContentLoaded",function(){
  
    fetch("https://znakzorro.github.io/zorro/data/yrno.en.pl.json")
    .then(function(response) {
          if (!response.ok) {throw Error(response.statusText);}
          return response.json();
    })
    .then(obj => {
        yrnoPL = obj;
        getYRNO(urlYRNO);
        console.log(yrnoPL);
    })
    .catch(e => {console.log(e)});
  
    
});
