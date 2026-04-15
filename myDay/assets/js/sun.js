const pad2=(s)=>{ return ("0"+s.toString()).slice(-2); }

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

const getSUN=()=>{
	let sunTEXT = "";

	let SUNdata = SunCalc.getTimes(new Date(), 53.38,14.66);
	//console.log(SUNdata)
      const dSunrise = new Date(SUNdata.sunrise);
      const dSunset  = new Date(SUNdata.sunset);
      const dateSunrise = dSunrise.getTime();
      const dateSunset  = dSunset.getTime();
      const dateDelta = dateSunset - dateSunrise;
      const teraz = new Date();
      const czas = teraz.toLocaleString('pl-PL', {hour:'2-digit',minute: '2-digit'}); //second:'2-digit' 
      const sunrise = dSunrise.toLocaleString('pl-PL', {hour:'2-digit',minute: '2-digit'});
      const sunset = dSunset.toLocaleString('pl-PL', {hour:'2-digit',minute: '2-digit'});
      console.log(czas,sunrise,sunset);
       let dayLen  = dayL(dateDelta/1000);
      let longest  = (17*60*60)+( 1*60); //17:01
      let shortest = ( 7*60*60)+(29*60); //7:29
        longest  *= 1000;
        shortest *= 1000;
      const dayShortes  = dayL((longest - dateDelta)/1000);
      const dayLongest  = dayL((dateDelta - shortest)/1000);

	sunTEXT = "Wschód słońca: "+sunrise+", zachód: "+sunset+", dzień trwa: "+dayLen.replace(":","h")+"m";
	
	const HM = (dayShortes>dayLongest) ? konwertujMinuty((dateDelta - shortest)/(60*1000)) : konwertujMinuty((longest - dateDelta)/(60*1000));
	const TX = (dayShortes>dayLongest) ? "dłuższy o " : "któtszy o ";
	console.log("mmmmmmmmmmmmmmm=",TX,HM);

	sunTEXT += " i jest "+TX + HM;
	//+"h "+dayShortes+" "+dayLongest;
	return sunTEXT;
}



/**
 * Konwertuje całkowitą liczbę minut na format 'X godzin i Y minut'.
 * @param {number} totalMinutes - Całkowita liczba minut.
 * @returns {string} Sformatowany czas.
 */
function konwertujMinuty(totalMinutes) {
    if (typeof totalMinutes !== 'number' || totalMinutes < 0) {
        return "Nieprawidłowa wartość wejściowa";
    }

    // 1. Obliczanie liczby godzin (całkowite dzielenie)
    // Używamy Math.floor(), aby upewnić się, że mamy tylko pełne godziny
    const hours = Math.floor(totalMinutes / 60);

    // 2. Obliczanie pozostałej liczby minut (reszta z dzielenia)
    // Operator % (modulo) daje nam resztę, która jest naszą pozostałą liczbą minut
    const minutes = Math.round(totalMinutes % 60);

    // 3. Tworzenie czytelnego ciągu tekstowego

    // Część z godzinami
    let hoursText = '';
    if (hours === 1) {
        hoursText = '1 godzinę';
    } else if (hours > 1) {
        hoursText = `${hours} godzin`; // Lub 'godzin' w zależności od kontekstu/liczby
    }

    // Część z minutami
    let minutesText = '';
    if (minutes === 1) {
        minutesText = '1 minutę';
    } else if (minutes > 1) {
        minutesText = `${minutes} minut`; // Lub 'minut'
    }

    // Łączenie tekstu
    if (hours > 0 && minutes > 0) {
        return `${hoursText} i ${minutesText}`;
    } else if (hours > 0) {
        return hoursText;
    } else if (minutes > 0) {
        return minutesText;
    } else {
        return "0 minut"; // Dla 0 minut
    }
}

// Przykłady użycia:
/*
console.log(konwertujMinuty(75)); // Powinno zwrócić: "1 godzina i 15 minut"
console.log(konwertujMinuty(120)); // Powinno zwrócić: "2 godziny"
console.log(konwertujMinuty(45)); // Powinno zwrócić: "45 minut"
console.log(konwertujMinuty(500)); // Powinno zwrócić: "8 godziny i 20 minuty"
console.log(konwertujMinuty(0)); // Powinno zwrócić: "0 minut"

*/



