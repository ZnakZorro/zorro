const yrnoemoji={
    "clearsky": "☀️",
    "fair": "🌤️",
    "partlycloudy": "⛅",
    "cloudy": "☁️",
    "overcast": "☁️",
    "rainshowers": "🌦️",
    "rain": "🌧️",
    "heavyrainshowers": "⛈️",
    "heavyrain": "🌧️",
    "lightrainshowers": "🌦️",
    "lightrain": "🌦️",
    "sleetshowers": "🌦️❄️",
    "sleet": "🌧️❄️",
    "heavysleetshowers": "❄️🌧️",
    "heavysleet": "❄️🌧️",
    "lightsleetshowers": "🌦️❄️",
    "lightsleet": "🌧️❄️",
    "snowshowers": "🌨️",
    "snow": "❄️",
    "heavysnowshowers": "❄️❄️",
    "heavysnow": "❄️❄️",
    "lightsnowshowers": "🌨️",
    "lightsnow": "❄️",
    "rainshowersandthunder": "⛈️",
    "rainandthunder": "⛈️",
    "heavyrainshowersandthunder": "⛈️",
    "heavyrainandthunder": "⛈️",
    "lightrainshowersandthunder": "⛈️",
    "lightrainandthunder": "⛈️",
    "sleetshowersandthunder": "⛈️❄️",
    "sleetandthunder": "⛈️❄️",
    "heavysleetshowersandthunder": "⛈️❄️",
    "heavysleetandthunder": "⛈️❄️",
    "lightsleetshowersandthunder": "⛈️❄️",
    "lightsleetandthunder": "⛈️❄️",
    "snowshowersandthunder": "⛈️❄️",
    "snowandthunder": "⛈️❄️",
    "heavysnowshowersandthunder": "⛈️❄️",
    "heavysnowandthunder": "⛈️❄️",
    "lightsnowshowersandthunder": "⛈️❄️",
    "lightsnowandthunder": "⛈️❄️",
    "fog": "🌫️"
  
}

const opisYrno=(symbol)=>{
    //console.log("symbol=",symbol);
	let cleanKey = symbol.split('_')[0]; // usunie "_day" lub "_night";
    //console.log("cleanKey=",cleanKey);
	let emojy = yrnoemoji[cleanKey] || "👀";	
	//console.log("emojy=",emojy);
    return emojy;
}
