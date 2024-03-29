let yrnoToken = ()=>{return(new Date()).getTime();}
let _city = "Szczecin-Dąbie";
let _dataType = "compact"; //  compact  complete   classic

let jsonAPP   = localStorage.getItem("APPconfig");
let configAPP = JSON.parse(jsonAPP);
//console.log("all 7 configAPP=",configAPP);
console.log(configAPP);
let lat  = configAPP.lat;
let lon  = configAPP.lon;
let alt  = configAPP.altitude;
let id   = configAPP.id;
let name = configAPP.name;
let yrnoDATAcity = name;

//console.log("14**************",lat,lon,alt,id,name);

//let  _old_urlYRNO = "https://api.met.no/weatherapi/locationforecast/2.0/"+_dataType+"?lat=53.378773&lon=14.665842&altitude=25";//&t="+yrnoToken();
let _urlYRNO = `https://api.met.no/weatherapi/locationforecast/2.0/${_dataType}?lat=${lat}&lon=${lon}&altitude=${alt}`;
//console.log(_urlYRNO);



const _getYRNO=(url)=>{  
  fetch(url)
    .then(function(response) {
          if (!response.ok) {throw Error(response.statusText);}
          return response.json();
    })
    .then(obj => {
        zapiszYRNO(obj);
    })
    .catch(e => {console.log(e)})
};

const zapiszYRNO=(obj)=>{
  let lastyrnoDATAcity =  localStorage.getItem("yrnoDATAcity") ? localStorage.getItem("yrnoDATAcity") : null;     
  console.log(obj)
  console.log(lastyrnoDATAcity,yrnoDATAcity)
  
  let updated_at = obj.properties.meta.updated_at;
      let timeNow   = (new Date()).getTime();
      let timeFrom  = (new Date(updated_at)).getTime();
      let timeCache = parseInt(localStorage.getItem("yrnoTIME") || 0); 
      let timeDelta =  timeNow - timeCache;
      let minuteDelta = timeDelta / 60000;
      //console.log(timeNow,timeFrom,timeCache,timeDelta,minuteDelta);
      //console.log("48 qqqqqqqqqqqqq === minuteDelta=",minuteDelta,lastyrnoDATAcity,yrnoDATAcity,(lastyrnoDATAcity === yrnoDATAcity));
      if (minuteDelta < 20 && (lastyrnoDATAcity === yrnoDATAcity)) return;
  let data = obj.properties.timeseries;
  let json = JSON.stringify(obj.properties.timeseries);
      localStorage.setItem("yrnoCITY", _city);
      localStorage.setItem("yrnoTIME", timeNow);
      localStorage.setItem("yrnoDATA", json);
      localStorage.setItem("yrnoTYPE", _dataType);     
  localStorage.setItem("yrnoDATAcity", yrnoDATAcity);     
  refreshYRNOview();
}

const getYRNO2Cache=()=>{
  _getYRNO(_urlYRNO);
}
_getYRNO(_urlYRNO);


