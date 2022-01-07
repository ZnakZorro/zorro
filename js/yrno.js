
const _$=e=>document.querySelector(e);
const _$$=e=>document.querySelectorAll(e);


/**
https://github.com/nicolasgrancher/weather-js
 * Get apparent temperature. Use wind chill or heat index.
 *
 * @param Tc temperature in celsius
 * @param Vkmh wind speed in km/h
 * @param R relative humidity
 * @param P pressure
 * @returns {number}
 */
function apparentTemperature(Tc, Vkmh, R, P) {
    Vkmh = Vkmh * 3.6;
    if (Tc < 10) {
        return this.windChill(Tc, Vkmh);
    }

    return this.heatIndex(Tc, R, P);
}

/**
 * Wind chill calculation.
 * @see https://en.wikipedia.org/wiki/Wind_chill
 *
 * @param Tc temperature in celsius
 * @param Vkmh wind speed in km/h
 * @returns {number}
 */
function windChill(Tc, Vkmh) {
    if (Tc >= 10)
        return Tc;

    var Rc;

    if (Vkmh >= 4.8 && Vkmh <= 177) {
        Rc = 13.12 + 0.6215 * Tc + (0.3965 * Tc - 11.37) * Math.pow(Vkmh, 0.16);
    } else if (Vkmh < 4.8) {
        Rc = Tc + 0.2 * (0.1345 * Tc - 1.59) * Vkmh;
    } else {
        Rc = Tc;
    }

    return Rc;
}

/**
 * Heat index calculation.
 * @see https://en.wikipedia.org/wiki/Heat_index
 *
 * @param Tc temperature in celsius
 * @param R relative humidity
 * @param P pressure
 * @returns {number}
 */
function heatIndex(Tc, R, P) {
    if (P < 16) {
        return Tc;
    }

    if (Tc < 27 || R < 0.40 || dewPoint(Tc, R) < 12) {
        return Tc;
    }

    var c1 = -8.784695;
    var c2 = 1.61139411;
    var c3 = 2.338549;
    var c4 = -0.14611605;
    var c5 = -1.2308094 * 0.01;
    var c6 = -1.6424828 * 0.01;
    var c7 = 2.211732 * 0.001;
    var c8 = 7.2546 * 0.0001;
    var c9 = -3.582 * 0.000001;

    var HI = c1 + c2 * Tc + c3 * R + c4 * Tc * R + c5 * Tc * Tc + c6 * R * R + c7 * Tc * Tc * R + c8 * Tc * R * R + c9 * Tc * Tc * R * R;

    return HI;
}
////////////////////////////////////////////////////////////////////////////////////////////////




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


const refresh=()=>{
  document.getElementById("logo").classList.add("loader");
   console.log("refresh()");
   document.location.reload();
}




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



  const winClick=(w)=>{
    console.log("winClick=",w);
    if (w===0) window.location.href="./app/meteo/";
    if (w===1) window.location.href="./app/radar/";
    if (w===2) getYRNOhour(3,"ev2");
    if (w===3) getYRNOhour(15,"ev3");
    
  }
  //qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
  const getYRNOhour=(nr=0,id)=>{ 
      console.log(nr,id)
      let json = localStorage.getItem("yrnoDATA");
      let obj  = JSON.parse(json);
      console.log(obj);
      let time = obj[nr].time;
      let data = obj[nr].data.instant.details;
      console.log(data);
      //console.log(obj[nr].data.next_1_hours.summary.symbol_code);
      let w={};
      w.time = hoursTime(obj[nr].time);
      w.t = data.air_temperature;
      w.temp = tosm(data.air_temperature);
      w.press = data.air_pressure_at_sea_level;
      w.wind  = data.wind_speed;
      w.humi  = data.relative_humidity;
      w.rain  = 0;
      w.chill = apparentTemperature(w.t, w.wind, w.humid, w.press).toFixed(1);
      w.info  = obj[nr].data.next_1_hours.summary.symbol_code;
      w.pl    = symbolTR(obj[nr].data.next_1_hours.summary.symbol_code);
      w.icon  = '<img src="'+gfxSVG+w.info+'.svg" />';
      console.log(w);
      let container = _$("#"+id);
      console.log(container);
      let zapas = container.innerHTML;
      container.innerHTML = `<span>${w.time}</span><span>${w.icon}</span><span>${w.temp}/${w.chill}</span><br /><span>${w.press}hPa</span><br /><span>${w.rain}</span><br /><span>${w.pl}</span>`;
      setTimeout(()=>{container.innerHTML = zapas},5000);
  }

const getYRNO=(url=urlYRNO)=>{ 
  console.log("getYRNO=====",counter);
  counter++;
  let lastTime = localStorage.getItem("yrnoTIME") || "0";
  cacheTimeMinutes = Math.round(((new Date()).getTime() - parseInt(lastTime))/60000);
  console.log("1 cacheTimeMinutes=====",cacheTimeMinutes);
  let json = localStorage.getItem("yrnoDATA");
  
  let obj  = JSON.parse(json);
  //console.log(obj);
  console.log(0,obj[0]);
  console.log(1,obj[1]);
  console.log(6,obj[6]);
  console.log(12,obj[12]);
  opisYRNO(obj);
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
  let arr = flo.toFixed(1).split(".");
  let plus="";
  if (flo>=0) plus="+";
  return plus+arr[0]+"<small>."+arr[1]+miano+'</small>';
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
  //console.log(data);
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
  

  let press00 = ronda(data[0].data.instant.details.air_pressure_at_sea_level);
  let press01 = ronda(data[1].data.instant.details.air_pressure_at_sea_level);
  let press06 = ronda(data[6].data.instant.details.air_pressure_at_sea_level);
  let press12 = ronda(data[12].data.instant.details.air_pressure_at_sea_level);
  //console.log(typeof(press01),"press01=====",press00,press01,press06,press12);
  
  let wind00 = data[0].data.instant.details.wind_speed;
  let wind01 = data[1].data.instant.details.wind_speed;
  let wind06 = data[6].data.instant.details.wind_speed;
  let wind12 = data[12].data.instant.details.wind_speed;
  
  let humid00 = data[0].data.instant.details.relative_humidity;
  let humid01 = data[1].data.instant.details.relative_humidity;
  let humid06 = data[6].data.instant.details.relative_humidity;
  let humid12 = data[12].data.instant.details.relative_humidity;
  //console.log(typeof(humid01),"humid01=====",humid00,humid01,humid06,humid12);
  
  //console.log(typeof(temp01),typeof(wind01));
  //let Chill00 = windChillCelsius(temp00, wind00 * 3.6).toFixed(1); 
  //let Chill01 = windChillCelsius(temp01, wind01 * 3.6).toFixed(1); 
  //let Chill06 = windChillCelsius(temp06, wind06 * 3.6).toFixed(1); 
  //let Chill12 = windChillCelsius(temp12, wind12 * 3.6).toFixed(1); 
  //console.log(typeof(Chill01),"1Chill01=====",Chill00,Chill01,Chill06,Chill12);
  
  let Chill00 = apparentTemperature(temp00, wind00, humid00, press00).toFixed(1); 
  let Chill01 = apparentTemperature(temp01, wind01, humid01, press01).toFixed(1); 
  let Chill06 = apparentTemperature(temp06, wind06, humid06, press06).toFixed(1); 
  let Chill12 = apparentTemperature(temp12, wind12, humid12, press12).toFixed(1); 
  //console.log(typeof(Chill01),"2Chill01=====",Chill00,Chill01,Chill06,Chill12);
  
  let icon_01 = '<img src="'+gfxSVG+next01.summary.symbol_code+'.svg" />';
  let icon_06 = '<img src="'+gfxSVG+next06.summary.symbol_code+'.svg" />';
  let icon_12 = '<img src="'+gfxSVG+next12.summary.symbol_code+'.svg" />';

  let time00 = hoursTime(data[0].time);
  let time01 = hoursTime(data[1].time);
  let time06 = hoursTime(data[6].time);
  let time12 = hoursTime(data[12].time);
  
  
  let html = '<!--pogoda-->';

  html += '<div class="grid pogoda">'+deltaDelta+'; '+time00+' <small>'+dataType+'</small></div>';
  html += '<div class="grid2 pogoda fon-20 fon-600" id="ev0"><div>'+tosm(temp01)+' / '+tosm(Chill00)+',</div><div> '+teraz.air_pressure_at_sea_level+'hPa, '+teraz.wind_speed+'m/s</div></div>';
  html += '<div class="grid pogoda fon-14">';  
    html += '<div id="ev1"><span>'+time01+'</span><span>'+icon_01+'</span><span>'+tosm(temp01)+'<br />'+tosm(Chill01)+'</span><br /><span>'+tosm(rain01,"mm")+'</span><br />'+press01+'hPa<br />'+wind01+'m/s<br />'+symbolTR(next01.summary.symbol_code)+'</div>';
    html += '<div id="ev2"><span>'+time06+'</span><span>'+icon_06+'</span><span>'+tosm(temp06)+'<br />'+tosm(Chill06)+'</span><br /><span>'+tosm(rain06,"mm")+'</span><br />'+press06+'hPa<br />'+wind06+'m/s<br />'+symbolTR(next06.summary.symbol_code)+'</div>';
    html += '<div id="ev3"><span>'+time12+'</span><span>'+icon_12+'</span><span>'+tosm(temp12)+'<br />'+tosm(Chill12)+'</span><br /><span>'+tosm(rain12,"mm")+'</span><br />'+press12+'hPa<br />'+wind12+'m/s<br />'+symbolTR(next12.summary.symbol_code)+'</div>';
  
  html += '</div>';

  document.getElementById("WeatherReport").innerHTML = html;
  // eventy
  document.getElementById("ev0").addEventListener('click', ((e)=>{winClick(0);}), false);
  document.getElementById("ev1").addEventListener('click', ((e)=>{winClick(1);}), false);
  document.getElementById("ev2").addEventListener('click', ((e)=>{winClick(2);}), false);
  document.getElementById("ev3").addEventListener('click', ((e)=>{winClick(3);}), false);
  
  setTimeout(()=>{document.getElementById("logo").classList.remove("loader");},500);
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
        //console.log(yrnoPL);
        //console.log("3 cacheTimeMinutes=====",cacheTimeMinutes);
        if (cacheTimeMinutes>30) setTimeout(()=>{getYRNO()},3000); 
    })
    .catch(e => {console.log(e)});
  
    
});





let licznik=0;
document.addEventListener("visibilitychange", function() {
  
    //console.log( document.visibilityState );
    if (document.visibilityState == 'hidden'){
      licznik++;
      //console.log('visibilityState == hidden');
    }
    if (document.visibilityState == 'visible'){
      licznik++;
      _$("#licznik").textContent = licznik;
        console.log("visibilityState cacheTimeMinutes=====",cacheTimeMinutes);
        if (cacheTimeMinutes>30) {
          _$("#logo").classList.add("loader");
          getYRNO();
        };       
    }




    
},false);

let liczFlag=0;
const handleVisibilityChange=(flag)=>{
    console.log("handleVisibilityChange=",flag)
    liczFlag++;
    let f= flag? "+":"-";
    _$("#flag").textContent = ", "+liczFlag+f;
    _$("#flag2").textContent += f+" ";
}
window.addEventListener('focus', function() {
  handleVisibilityChange(true);
}, false);

window.addEventListener('blur', function() {
  handleVisibilityChange(false);
}, false);
