

const transPL=(ang)=> {
    angLOW = ang.toLowerCase();
    const transarr = {
      "monday": "poniedziałek",
      "tuesday": "wtorek",
      "wednesday": "środa",
      "thursday": "czwartek",
      "friday": "piątek",
      "saturday": "sobota",
      "sunday": "niedziela",
    };  
    return transarr[angLOW] ? transarr[angLOW] : ang;
  }



  String.prototype.pla = function()
{
    return this.replace(/ą/g, 'a').replace(/Ą/g, 'A')
        .replace(/ć/g, 'c').replace(/Ć/g, 'C')
        .replace(/ę/g, 'e').replace(/Ę/g, 'E')
        .replace(/ł/g, 'l').replace(/Ł/g, 'L')
        .replace(/ń/g, 'n').replace(/Ń/g, 'N')
        .replace(/ó/g, 'o').replace(/Ó/g, 'O')
        .replace(/ś/g, 's').replace(/Ś/g, 'S')
        .replace(/ż/g, 'z').replace(/Ż/g, 'Z')
        .replace(/ź/g, 'z').replace(/Ź/g, 'Z');
}

const langPL:{
	shortWeekdays:  ['Ni', 'Po', 'Wt', 'Śr', 'Cz', 'Pn', 'So'],
	weekdays:       ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
	shortMonths:    ["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"],
	months:         ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"]
}


const miesiace = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
const dni = ["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"];  


const miesiace = [
	"Styczeń",
	"Luty",
	"Marzec",
	"Kwiecień",
	"Maj",
	"Czerwiec",
	"Lipiec",
	"Sierpień",
	"Wrzesień",
	"Październik",
	"Listopad",
	"Grudzień"
];

const dni = [
	"Niedziela",
	"Poniedziałek",
	"Wtorek",
	"Środa",
	"Czwartek",
	"Piątek",
	"Sobota"
];
