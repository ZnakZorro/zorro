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
      $("#teraz").innerHTML = czas;
      let dayLen  = dayL(dateDelta/1000);
        $("#sun").innerHTML  = `<div><span class="s1">Wsch.:</span> <span class="s2">${sunrise}</span></div>`;
        $("#sun").innerHTML += `<div><span class="s1">Zach.:</span> <span class="s2">${sunset}</span></div>`;
        $("#sun").innerHTML += `<div><span class="s1">Dzień:</span> <span class="s2">${dayLen}</span></div>`;
      let longest  = (17*60*60)+( 1*60); //17:01
      let shortest = ( 7*60*60)+(29*60); //7:29
        longest  *= 1000;
        shortest *= 1000;
      const dayShortes  = dayL((longest - dateDelta)/1000);
      const dayLongest  = dayL((dateDelta - shortest)/1000);
      //console.log("sssssssssssss",dateDelta - shortest,longest - dateDelta);
      //console.log("sssssssssssss",dateSunset,dateSunrise,dateDelta,dayLongest,dayShortes);  
        $("#sunplus").innerHTML  = `<div><span class="s1">Dłu.:</span> <span class="s2">${dayLongest}</span></div>`;
        $("#sunplus").innerHTML += `<div><span class="s1">Krót.:</span> <span class="s2">${dayShortes}</span></div>`;
        $("#sunplus").innerHTML += `<div><span class="s1"></span> <span class="s2">7:30/17:01</span></div>`;

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
        hoursText = '1 godzina';
    } else if (hours > 1) {
        hoursText = `${hours} godziny`; // Lub 'godzin' w zależności od kontekstu/liczby
    }

    // Część z minutami
    let minutesText = '';
    if (minutes === 1) {
        minutesText = '1 minuta';
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

console.log(konwertujMinuty(75)); // Powinno zwrócić: "1 godzina i 15 minut"
console.log(konwertujMinuty(120)); // Powinno zwrócić: "2 godziny"
console.log(konwertujMinuty(45)); // Powinno zwrócić: "45 minut"
console.log(konwertujMinuty(500)); // Powinno zwrócić: "8 godziny i 20 minuty"
console.log(konwertujMinuty(0)); // Powinno zwrócić: "0 minut"







$("#czas").innerHTML = "";
$("#czas").innerHTML += new Date().toLocaleString('pl-PL', {hour:'2-digit',minute: '2-digit'})+",&nbsp; "+new Date().toLocaleString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });



//$("#czas").innerHTML += "<p>"+new Date().toLocaleString('pl-PL', {hour:'2-digit',minute: '2-digit', second:'2-digit'})+"</p>";

const tera = new Date();
const format = tera.toLocaleString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Wymusza format 24h
}).replace(',', ''); // Usuwa przecinek, który czasem pojawia się między datą a czasem
console.log(format);
//$("#czas").innerHTML += "<p>"+format+"</p>";


/*
const terazISO = new Date().toISOString();
const formatISO = terazISO.slice(0, 10) + ' ' + terazISO.slice(11, 16);
console.log(formatISO); // "2025-12-25 14:06"
$("#czas").innerHTML += "<p>"+formatISO+"</p>";
*/

