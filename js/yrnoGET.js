let dataType = "compact"; //  compact  complete   classic
let urlYRNO = "https://api.met.no/weatherapi/locationforecast/2.0/"+dataType+"?lat=53.378773&lon=14.665842&altitude=25"
//let yrnoPL={};

const getYRNO=(url)=>{  
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
  //console.log(obj)
  let updated_at = obj.properties.meta.updated_at;
      let timeNow   = (new Date()).getTime();
      let timeFrom  = (new Date(updated_at)).getTime();
      let timeCache = parseInt(localStorage.getItem("yrnoTIME") || 0); 
      let timeDelta =  timeNow - timeCache;
      let minuteDelta = timeDelta / 60000;
      //console.log(timeNow,timeFrom,timeCache,timeDelta,minuteDelta);
      console.log("minuteDelta=",minuteDelta);
      if (minuteDelta < 30) return;
  let data = obj.properties.timeseries;
  let json = JSON.stringify(obj.properties.timeseries);
  //console.log(updated_at)
  //console.log(data)
      localStorage.setItem("yrnoTIME", timeNow);
      localStorage.setItem("yrnoDATA", json);
       
}
getYRNO(urlYRNO);

/*
    fetch("https://znakzorro.github.io/zorro/data/yrno.en.pl.json")
    .then(function(response) {
          if (!response.ok) {throw Error(response.statusText);}
          return response.json();
    })
    .then(obj => {
        yrnoPL = obj;
        getYRNO(urlYRNO);
        //console.log(yrnoPL);
    })
    .catch(e => {console.log(e)});
 */
