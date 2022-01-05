console.log("yrno.js");
console.log("https://api.met.no/weatherapi/locationforecast/2.0/");
console.log("https://api.met.no/weatherapi/weathericon/2.0/documentation");

//let gfxSVG = "https://api.met.no/images/weathericons/svg/clearsky_day.svg";
let gfxSVG = "https://api.met.no/images/weathericons/svg/";

//let dataType = "compact"; //  compact  complete   classic
let dataType = localStorage.getItem("yrnoTYPE") || "???";
console.log("dataType=====",dataType);
let nic = localStorage.getItem("nic") || "***";
console.log("nic=====",nic);


//let urlYRNO = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=53.378773&lon=14.665842&altitude=25";
let urlYRNO = "https://api.met.no/weatherapi/locationforecast/2.0/"+dataType+"?lat=53.378773&lon=14.665842&altitude=25"
let yrnoPL={};
let cacheTimeMinutes=99;
let counter=0;


/*
// Apparent temperature calculation
// accepts temperature [C], humidity [%], wind speed [m/s]
// returns apparent temperature [C]
function apparent($apparentT,$apparentH,$apparentW){
  $e = ($apparentH/100)*6.105*pow(2.71828, ((17.27*$apparentT)/(237.7+$apparentT)));
  $calcA = round(($apparentT + 0.33*$e-0.7*$apparentW-4),1);
  return $calcA;
}
*/
//T: temperature in degrees Celsius
//V: wind velocity in kilometers per hour
const windChillCelsius = (temperature, windSpeed) =>
  13.12 +
  0.6215 * temperature -
  11.37 * windSpeed ** 0.16 +
  0.3965 * temperature * windSpeed ** 0.16;


const getYRNO=(url=urlYRNO)=>{ 
  console.log("getYRNO=====",counter);
  counter++;
  let lastTime = localStorage.getItem("yrnoTIME") || "0";
  cacheTimeMinutes = Math.round(((new Date()).getTime() - parseInt(lastTime))/60000);
  console.log("1 cacheTimeMinutes=====",cacheTimeMinutes);
  let json = localStorage.getItem("yrnoDATA");
  
  let obj  = JSON.parse(json);
  console.log(obj);
  opisYRNO(obj);
  return;
/*  
  fetch(url)
    .then(function(response) {
          if (!response.ok) {throw Error(response.statusText);}
          return response.json();
    })
    .then(obj => {
        opisYRNO(obj);
    })
    .catch(e => {console.log(e)})
*/
};

const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

const symbolTR=(tx)=>{
  console.log("symbol=",tx);
  tx = tx.split("_")[0];
  return (yrnoPL[tx].pl);
}
const ronda=(tx)=>{
  let int = parseInt(tx);
  return int.toString();
}
const tosm=(tx,miano="&deg;C")=>{
  let flo = parseFloat(tx);
  let arr = flo.toFixed(1).split(".")
  return arr[0]+"<small>."+arr[1]+miano+'</small>';
}
const dateFrom=(updated_at)=>{
    let newFrom  = (new Date()).getTime();
    let timeFrom = (new Date(updated_at)).getTime();
    console.log(newFrom,timeFrom);
    let delta = newFrom - timeFrom;
    let minutes = Math.round(delta/(60*1000));
    let hours   = "00";
    return hours+":"+minutes;
}
String.prototype.pad2 = function()  {return ("0" + this).slice(-2);}

const hoursTime=(dd)=>{
  let d = (new Date(dd));
  let godzina = (d.getHours()).toString().pad2();
  let minuta  = (d.getMinutes()).toString().pad2();
  return godzina+":"+minuta;
}


const opisYRNO=(data)=>{
  let container = document.querySelector("div.container");
      let timeCache = parseInt(localStorage.getItem("yrnoTIME") || 0); 
      let timeNow   = (new Date()).getTime();
      let timeDelta =  timeNow - timeCache;
      let minuteDelta = Math.round(timeDelta / 60000);
      let hourDelta = 0;
      if (minuteDelta>60){
          hourDelta = Math.floor(minuteDelta/60);
          minuteDelta = minuteDelta - (hourDelta * 60);
      }
      let deltaDelta = hourDelta.toString().pad2()+":"+minuteDelta.toString().pad2();
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
  let rain12 = (data[0].data.next_12_hours.details?.precipitation_amount) ? data[0].data.next_12_hours.details.precipitation_amount : "0";
  //let rain01 = (data[0].data.next_01_hours.details?.precipitation_amount) || "?";
  //let rain06 = (data[0].data.next_06_hours.details?.precipitation_amount) || "?";
  //let rain12 = (data[0].data.next_12_hours.details?.precipitation_amount) || "?";
   
  
  let temp00 = data[0].data.instant.details.air_temperature || teraz.air_temperature;
  let temp01 = data[1].data.instant.details.air_temperature || teraz.air_temperature;
  let temp06 = data[6].data.instant.details.air_temperature || teraz.air_temperature;
  let temp12 = data[12].data.instant.details.air_temperature || teraz.air_temperature;
  

  let press01 = ronda(data[1].data.instant.details.air_pressure_at_sea_level);
  let press06 = ronda(data[6].data.instant.details.air_pressure_at_sea_level);
  let press12 = ronda(data[12].data.instant.details.air_pressure_at_sea_level);
  
  let wind00 = data[0].data.instant.details.wind_speed;
  let wind01 = data[1].data.instant.details.wind_speed;
  let wind06 = data[6].data.instant.details.wind_speed;
  let wind12 = data[12].data.instant.details.wind_speed;
  
  //console.log(typeof(temp01),typeof(wind01));
  let Chill00 = windChillCelsius(temp00, wind00 * 3.6).toFixed(1); 
  let Chill01 = windChillCelsius(temp01, wind01 * 3.6).toFixed(1); 
  let Chill06 = windChillCelsius(temp06, wind06 * 3.6).toFixed(1); 
  let Chill12 = windChillCelsius(temp12, wind12 * 3.6).toFixed(1); 
  console.log(typeof(Chill01),"Chill01=====",Chill00,Chill01,Chill06,Chill12);
  
  
  let icon_01 = '<img src="'+gfxSVG+next01.summary.symbol_code+'.svg" />';
  let icon_06 = '<img src="'+gfxSVG+next06.summary.symbol_code+'.svg" />';
  let icon_12 = '<img src="'+gfxSVG+next12.summary.symbol_code+'.svg" />';

  let time00 = hoursTime(data[0].time);
  let time01 = hoursTime(data[1].time);
  let time06 = hoursTime(data[6].time);
  let time12 = hoursTime(data[12].time);
  
  
  let html = '<!--pogoda-->';

  html += '<div class="grid pogoda-1">'+deltaDelta+'; '+time00+' <small>'+dataType+'</small></div>';
  html += '<div class="grid pogoda-1"><b>'+tosm(temp01)+' / '+tosm(Chill00)+', '+teraz.air_pressure_at_sea_level+'hPa, '+teraz.wind_speed+'m/s</b></div>';
  html += '<div class="grid pogoda pogoda-3">';
   
    html += '<div><span>'+time01+'</span><span>'+icon_01+'</span><span>'+tosm(temp01)+'<br />'+tosm(Chill01)+'</span><br /><span>'+tosm(rain01,"mm")+'</span><br />'+press01+'hPa<br />'+wind01+'m/s<br />'+symbolTR(next01.summary.symbol_code)+'</div>';
    html += '<div><span>'+time06+'</span><span>'+icon_06+'</span><span>'+tosm(temp06)+'<br />'+tosm(Chill06)+'</span><br /><span>'+tosm(rain06,"mm")+'</span><br />'+press06+'hPa<br />'+wind06+'m/s<br />'+symbolTR(next06.summary.symbol_code)+'</div>';
    html += '<div><span>'+time12+'</span><span>'+icon_12+'</span><span>'+tosm(temp12)+'<br />'+tosm(Chill12)+'</span><br /><span>'+tosm(rain12,"mm")+'</span><br />'+press12+'hPa<br />'+wind12+'m/s<br />'+symbolTR(next12.summary.symbol_code)+'</div>';
  
  html += '</div>';

  document.getElementById("WeatherReport").innerHTML = html;
  //container.insertAdjacentHTML('afterbegin', html);
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
const insertWeatherReport=()=>{
  if (!document.getElementById("WeatherReport"))
      document.querySelector("div.container").insertAdjacentHTML('afterbegin', '<div id="WeatherReport"></div>');
}

document.addEventListener("DOMContentLoaded",function(){
  
    insertWeatherReport();
    getYRNO2Cache();
   
  
    fetch("https://znakzorro.github.io/zorro/data/yrno.en.pl.json")
    .then(function(response) {
          if (!response.ok) {throw Error(response.statusText);}
          return response.json();
    })
    .then(obj => {
        yrnoPL = obj;
        getYRNO(urlYRNO);
        console.log(yrnoPL);
        console.log("3 cacheTimeMinutes=====",cacheTimeMinutes);
        if (cacheTimeMinutes>30) setTimeout(()=>{getYRNO()},3000); 
    })
    .catch(e => {console.log(e)});
  
    
});
