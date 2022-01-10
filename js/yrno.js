
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
//console.log("https://api.met.no/weatherapi/locationforecast/2.0/");
//console.log("https://api.met.no/weatherapi/weathericon/2.0/documentation");

//let gfxSVG = "https://api.met.no/images/weathericons/svg/clearsky_day.svg";
let gfxSVG = "https://api.met.no/images/weathericons/svg/";

//let dataType = "compact"; //  compact  complete   classic
let dataType = localStorage.getItem("yrnoTYPE") || "???";
console.log("dataType=====",dataType);
let nic = localStorage.getItem("nic") || "***";



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
    if (w===0) window.location.href="./app/meteo/";
    if (w===1) window.location.href="./app/radar/";
    if (w===2) getYRNOhour(1+2,"ev2");
    if (w===3) getYRNOhour(6+3,"ev3");
    if (w===4) getYRNOhour(12+6,"ev4");
    
  }
  //qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
  const getOBJhour=(nr=0)=>{ 
    let json = localStorage.getItem("yrnoDATA");
    let obj  = JSON.parse(json);
    let time = obj[nr].time;
    let data = obj[nr].data.instant.details;
    //console.log(data);
    //console.log(obj[nr].data.next_1_hours.summary.symbol_code);
    let rain = obj[nr].data.next_1_hours.precipitation_amount || 0;
    let rain01 = (obj[nr].data.next_1_hours.details?.precipitation_amount)  ? obj[nr].data.next_1_hours.details.precipitation_amount : 0;
    let w={};
    w.time = hoursTime(obj[nr].time);
    w.t = data.air_temperature;
    w.temp = tosm(data.air_temperature);
    w.press = Math.round(data.air_pressure_at_sea_level);
    w.wind  = data.wind_speed;
    w.humi  = data.relative_humidity;
    w.rain  = tosm(rain,"mm");
    w.rain01  = rain01;
    w.chill = tosm(apparentTemperature(w.t, w.wind, w.humid, w.press).toFixed(1));
    w.info  = obj[nr].data.next_1_hours.summary.symbol_code;
    w.pl    = symbolTR(obj[nr].data.next_1_hours.summary.symbol_code);
    w.icon  = '<img src="'+gfxSVG+w.info+'.svg" />';
    return w;
} 

//fffffffffffffffffffffffffffffffffffffff
//const formatLine=(w)=> `<span>${w.time}</span><span>${w.icon}</span><span>${w.temp}<br />${w.chill}</span><br /><span>${w.rain}</span><br /><span>${tosm(w.press,"hPa")}</span><br /><span>${tosm(w.wind,"m/s")}</span><br /><span>${w.pl}</span>`;
const formatLine=(w)=> `<span>${w.time}</span><span>${w.icon}</span><span>${w.temp}<br />${w.chill}</span><br /><span>${w.rain}</span><br /><span>${tosm(w.press,"hPa")}</span><br /><span>${ronda(w.wind,"m/s")}, ${ronda(w.humi,"%")}</span>`;

  const getYRNOhour=(nr=0,id)=>{ 
      let w = getOBJhour(nr);
      //console.log("wwwwwwwwwwwwww");
      //console.log("wwwwww=",w);
      let container = _$("#"+id);
      let zapas = container.innerHTML;
      container.innerHTML = formatLine(w);
      container.classList.add("active");
      setTimeout(()=>{container.innerHTML = zapas; container.classList.remove("active");},5000);
  }
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
const countCacheTimeMinutes = () => Math.round(((new Date()).getTime() - parseInt(localStorage.getItem("yrnoTIME") || "0"))/60000);

const getYRNO=(url=urlYRNO)=>{ 
  console.log("getYRNO=====",counter);
  counter++;
  let lastTime = localStorage.getItem("yrnoTIME") || "0";
  cacheTimeMinutes = Math.round(((new Date()).getTime() - parseInt(lastTime))/60000);
  console.log("1 cacheTimeMinutes=====",cacheTimeMinutes);
  let json = localStorage.getItem("yrnoDATA");
  
  let obj  = JSON.parse(json);
  //console.log(obj);
  //console.log(0,obj[0]);
  //console.log(1,obj[1]);
  //console.log(6,obj[6]);
  //console.log(12,obj[12]);
  opisYRNO(obj);
};

const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

const symbolTR=(tx)=>{
  console.log("symbol=",tx);
  tx = tx.split("_")[0];
  return (yrnoPL[tx].pl);
}
const ronda=(tx,miano=null)=>{
  let inte = Math.round(parseFloat(tx));
  let out = inte.toString()
  if (miano){
    out = out+"<small>"+miano+"</small>";
  }
  return out;
}
const tosm=(tx,miano="&deg;C")=>{
  let flo = parseFloat(tx);
  let arr = flo.toFixed(1).split(".");
  let plus="";
  if (flo>=0 && miano==="&deg;C") plus="+";
  return plus+arr[0]+"<small>."+arr[1]+miano+'</small>';
}
const dateFrom=(updated_at)=>{
    let newFrom  = (new Date()).getTime();
    let timeFrom = (new Date(updated_at)).getTime();
    //console.log(newFrom,timeFrom);
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

  let w00 = getOBJhour(0);
  let w01 = getOBJhour(1);
  let w06 = getOBJhour(6);
  let w12 = getOBJhour(12);
  //console.log("w00=",w00);
  //console.log("w01=",w01);
  //console.log("w06=",w06);
  //console.log("w12=",w12);
  
  let html = '<!--pogoda-->';

  html += '<div class="grid pogoda">'+deltaDelta+'; '+w00.time+' <small>'+dataType+'</small></div>';
  html += '<div class="grid2 pogoda fon-20 fon-600"><div id="ev0">'+w00.temp+' / '+w00.chill+',</div><div id="ev1"> '+tosm(w00.press,"hPa")+', '+tosm(w00.wind,"m/s")+'</div></div>';
  html += '<div class="grid pogoda fon-14">';   
    html += `<div id="ev2">${formatLine(w01)}</div>`;
    html += `<div id="ev3">${formatLine(w06)}</div>`;
    html += `<div id="ev4">${formatLine(w12)}</div>`;
  html += '</div>';

  _$("#WeatherReport").innerHTML = html;
  // eventy
  _$("#ev0").addEventListener('click', ((e)=>{winClick(0);}), false);
  _$("#ev1").addEventListener('click', ((e)=>{winClick(1);}), false);
  _$("#ev2").addEventListener('click', ((e)=>{winClick(2);}), false);
  _$("#ev3").addEventListener('click', ((e)=>{winClick(3);}), false);
  _$("#ev4").addEventListener('click', ((e)=>{winClick(4);}), false);
  
  setTimeout(()=>{_$("#logo").classList.remove("loader");},500);
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
    setInterval(()=>{
      cacheTimeMinutes = countCacheTimeMinutes();
      //console.log(cacheTimeMinutes);

    },300000)
   
  
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





//let licznik=0;
document.addEventListener("visibilitychange", function() {
  
    //console.log( document.visibilityState );
    if (document.visibilityState == 'hidden'){
      //licznik++;
      //console.log('visibilityState == hidden');
    }
    if (document.visibilityState == 'visible'){
      //licznik++;
      //_$("#licznik").textContent = licznik;
        console.log("visibilityState cacheTimeMinutes=====",cacheTimeMinutes);
        if (cacheTimeMinutes>30) {
          _$("#logo").classList.add("loader");
          getYRNO();
        };       
    }
},false);

/*
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
*/

/*
fetch("https://www.yr.no//api/v0/locations/2-3083828/celestialevents")
    .then(function(response) {
          if (!response.ok) {throw Error(response.statusText);}
          return response.json();
    })
    .then(obj => {
        console.log(obj);
    })
    .catch(e => {console.log(e)});
*/
function pad2(s) { return ("0"+s.toString()).slice(-2); }

const dateHM=(date)=>{
  let d = (new Date(date));
  let H = pad2(d.getHours());
  let M = pad2(d.getMinutes());  
  return H+":"+M;
}

const dayL=(time)=>{
  let H = Math.floor(time/3600);
  let M = Math.round((time-(3600*H)) / 60); 
  return pad2(H)+":"+pad2(M);
}

fetch("https://api.sunrise-sunset.org/json?lat=54.2694&lng=14.9804&formatted=0")
.then(function(response) {
  if (!response.ok) {throw Error(response.statusText);}
  return response.json();
})
.then(data => {
  console.log(data,new Date(Date.parse(data.results.sunrise)))
  let sunrise = (new Date(data.results.sunrise)).toLocaleString('pl-PL').split(" ").pop();
  let sunset  = (new Date(data.results.sunset)).toLocaleString('pl-PL').split(" ").pop();
  sunrise = sunrise.replace(/(\:\d\d)$/,"");
  sunset  =  sunset.replace(/(\:\d\d)$/,"");
  //console.log(sunrise,sunset)
  let dayLen  = dayL(data.results.day_length);
    _$("#sun").innerHTML  = `<div><span>Wschód:</span> <span>${sunrise}</span></div>`;
    _$("#sun").innerHTML += `<div><span>Zachód:</span> <span>${sunset}</span></div>`;
    _$("#sun").innerHTML += `<div><span>Dzień:</span> <span>${dayLen}</span></div>`;
});
/*
results:
astronomical_twilight_begin: "2022-01-09T05:05:27+00:00"
astronomical_twilight_end: "2022-01-09T17:08:53+00:00"
civil_twilight_begin: "2022-01-09T06:34:07+00:00"
civil_twilight_end: "2022-01-09T15:40:13+00:00"
day_length: 27906
nautical_twilight_begin: "2022-01-09T05:48:30+00:00"
nautical_twilight_end: "2022-01-09T16:25:50+00:00"
solar_noon: "2022-01-09T11:07:10+00:00"
sunrise: "2022-01-09T07:14:37+00:00"
sunset: "2022-01-09T14:59:43+00:00"
*/

///////////////////////

/*
console.log((new Date()).toLocaleString('pl-PL'));

const date = new Date();

console.log(date.toLocaleDateString('pl-PL'));

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
console.log(date.toLocaleDateString('pl-PL', dateOptions));

console.log(
  date.toLocaleDateString('pl-PL', {
    month: 'short',
    day: 'numeric',
  }),
);

console.log(
  date.toLocaleDateString('pl-PL', {
    month: 'long',
  }),
);

console.log(date.toLocaleTimeString('pl-PL'));

const timeOptions = {
  //hour12: true,
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
};

console.log(date.toLocaleTimeString('pl-PL', timeOptions));
// 11:30:33 PM

console.log(
  date.toLocaleTimeString('pl-PL', {
    timeZone: 'Europe/Warsaw',
  }),
);
*/

/*
const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
const timeOptions = {
  //hour12: true,
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
};
const date = new Date();
console.log( date.toLocaleString('pl-PL', { ...timeOptions, ...dateOptions }));
console.log( date.toLocaleString('pl-PL'));
console.log(date.toLocaleString('pl-PL'));
*/
 