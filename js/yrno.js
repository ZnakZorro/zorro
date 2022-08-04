const getYRNOurl=()=>{
        let _dataType = "compact"; //  compact  complete   classic
        let jsonAPP   = localStorage.getItem("APPconfig");
        let configAPP = JSON.parse(jsonAPP);
        let lat  = configAPP.lat;
        let lon  = configAPP.lon;
        let alt  = configAPP.altitude;
        let id   = configAPP.id;
        //let name = configAPP.name;
        //et yrnoDATAcity = name;
        let _urlYRNO = `https://api.met.no/weatherapi/locationforecast/2.0/${_dataType}?lat=${lat}&lon=${lon}&altitude=${alt}`;
        console.log(_urlYRNO);
    return _urlYRNO;
}    


/**
b - remoove chill temperature
 * Dew point calculation.
 * @see https://en.wikipedia.org/wiki/Dew_point
 *
 * @param Tc temperature in celsius
 * @param R relative humidity
 * @returns {number}
 */
function dewPoint(Tc, R) {
    //console.log("#11 dewPoint=", Tc, R)
    if (!Tc || !R )                             {return Tc;}
    //if (Tc ==="undefined" || R==="undefined" )  {console.log(7); return Tc;}
    //if (Tc ===undefined   || R=== undefined  )  {console.log(8); return Tc;}
    
    if (Tc < 0 || Tc > 60) {
        return Tc;
    }

    if (R < 0.01 || R > 1) {
        return Tc;
    }

    var a = 17.27;
    var b = 237.7;

    var alphaTR = ((a * Tc) / (b + Tc)) + Math.log(R);

    var Tr = (b * alphaTR) / (a - alphaTR);

    if (Tr < 0 || Tr > 50) {
        return Tc;
    }
    //console.log("#30 dewPoint=",Tr)
    return Tr;
}


//console.log(APPconfig);
//console.log(APPconfig[APPcity]);

/*
Szczecin
https://www.google.pl/maps/@53.380588,14.6628268,21z?hl=pl&expflags=__data_rollout__Tactile.IsDogfoodRollout__launched__%3Afalse%2C__data_rollout__Tactile.IsFishfoodRollout__launched__%3Afalse
dabie
https://www.google.pl/maps/@53.3787806,14.66581,21z?hl=pl&expflags=__data_rollout__Tactile.IsDogfoodRollout__launched__%3Afalse%2C__data_rollout__Tactile.IsFishfoodRollout__launched__%3Afalse


*/

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
    console.log("apparentTemperature(Tc, Vkmh, R, P)=",Tc, Vkmh, R, P);
    Vkmh = Vkmh * 3.6;
    if (Tc < 10) {
        return windChill(Tc, Vkmh);
    }

    return heatIndex(Tc, R, P);
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
   console.log("#106 heatIndex(Tc, R, P)=",Tc, R, P)
    if (!window.dewPoint) {       
        return Tc; 
    }
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
//console.log("dataType=====",dataType);
let nic = localStorage.getItem("nic") || "***";



//let urlYRNO = "https://api.met.no/weatherapi/locationforecast/2.0/"+dataType+"?lat=53.378773&lon=14.665842&altitude=25"
let urlYRNO = getYRNOurl();
console.log("urlYRNO=====",urlYRNO);
let yrnoPL={};
let cacheTimeMinutes=99;
//let counter=0;


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
    let symbol = obj[nr].data.next_1_hours.summary.symbol_code.split("_")[0];
    let time = obj[nr].time;
    let data = obj[nr].data.instant.details;
    console.log(data);
    //console.log(obj[nr].data.next_1_hours.summary.symbol_code);
    let rain = obj[nr].data.next_1_hours.precipitation_amount || 0;
    let rain01 = (obj[nr].data.next_1_hours.details?.precipitation_amount)  ? obj[nr].data.next_1_hours.details.precipitation_amount : 0;
    let w={};
    w.time = hoursTime(obj[nr].time);
    w.t = data.air_temperature;
    w.temp = tosm(data.air_temperature);
    w.press = Math.round(data.air_pressure_at_sea_level);
    w.wind  = data.wind_speed;
    w.humid  = data.relative_humidity;
    w.rain  = tosm(rain,"mm");
    w.rain01  = rain01;
console.log("235 apparentTemperature(w.t, w.wind, w.humid, w.press)=",w.t, w.wind, w.humid, w.press)          
    w.chill = tosm(apparentTemperature(w.t, w.wind, w.humid, w.press).toFixed(1));
    w.info  = obj[nr].data.next_1_hours.summary.symbol_code;
    w.pl    = symbolTR(obj[nr].data.next_1_hours.summary.symbol_code);
    w.icon  = '<img src="'+gfxSVG+w.info+'.svg" />';
    w.symbol = symbol;
    //console.log("#222 w=",w);
    return w;
} 

//fffffffffffffffffffffffffffffffffffffff
const formatLine=(w)=> `<span>${w.time}</span><span>${w.icon}</span><span>${w.temp}</span><br /><span>${tosm(w.press,"hPa")}</span><br /><span>${ronda(w.wind,"m/s")}, ${ronda(w.humid,"%")}</span>`;

  const getYRNOhour=(nr=0,id)=>{ 
      let w = getOBJhour(nr);
      setNewPogodaFoto(0,w);
      //console.log("235 obj wwwwwwwwww=",w);
      let container = _$("#"+id);
      let zapas = container.innerHTML;
      container.innerHTML = formatLine(w);
      container.classList.add("active");
      setTimeout(()=>{
        container.innerHTML = zapas; 
        container.classList.remove("active");
        let w0 = getOBJhour(0);
        setNewPogodaFoto(0,w0);
      },5000);
  }
//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
const countCacheTimeMinutes = () => Math.round(((new Date()).getTime() - parseInt(localStorage.getItem("yrnoTIME") || "0"))/60000);

const getYRNO=(url=urlYRNO)=>{
  let lastTime = localStorage.getItem("yrnoTIME") || "0";
  cacheTimeMinutes = Math.round(((new Date()).getTime() - parseInt(lastTime))/60000);
  let json = localStorage.getItem("yrnoDATA"); 
  let obj  = JSON.parse(json);
  opisYRNO(obj);
};

const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

const symbolTR=(tx)=>{
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

const setNewPogodaFoto=(nr,obj)=>{
  let pogodaSRC = yrnoPL[obj.symbol].img || "pogoda.jpg";
  _$("#pogoda").src="./img/meteo/"+pogodaSRC;  
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
  setNewPogodaFoto(0,w00);

  let html = '<!--pogoda-->';

    html += '<div class="grid pogoda fon-14">';   
    html += `<div id="ev2">${formatLine(w01)}</div>`;
    html += `<div id="ev3">${formatLine(w06)}</div>`;
    html += `<div id="ev4">${formatLine(w12)}</div>`;
  html += '</div>';

  _$("#WeatherReport").innerHTML = html;
  
  _$("#ev2").addEventListener('click', ((e)=>{winClick(2);}), false);
  _$("#ev3").addEventListener('click', ((e)=>{winClick(3);}), false);
  _$("#ev4").addEventListener('click', ((e)=>{winClick(4);}), false);

}

const insertWeatherReport=()=>{
  if (!document.getElementById("WeatherReport"))
      document.querySelector("div.container").insertAdjacentHTML('afterbegin', '<div id="WeatherReport"></div>');
}

const testNazw=(obj)=>{
  let out = {}
  for (let o in obj){
    out[obj[o].pl] = 0;
  }
  let arr=[];
  let pll=[];
  for (let o in out){
    arr.push(o);
    pll.push(o.replaceAll(" ","_"));
  }
  arr.sort();
}


document.addEventListener("DOMContentLoaded",function(){  
    insertWeatherReport();
    getYRNO2Cache();
    setInterval(()=>{
      cacheTimeMinutes = countCacheTimeMinutes();
    },300000)
   
 
    fetch("https://znakzorro.github.io/zorro/data/yrno.img.en.pl.json")
    .then(function(response) {
          if (!response.ok) {throw Error(response.statusText);}
          return response.json();
    })
    .then(obj => {
        yrnoPL = obj;      
        getYRNO(urlYRNO);
        testNazw(obj);
        if (cacheTimeMinutes>30) setTimeout(()=>{getYRNO()},3000); 
    })
    .catch(e => {console.log(e)});
  
    
});

const refreshYRNOview=()=>{
    console.log("refreshYRNOview()===");  
}



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

 
