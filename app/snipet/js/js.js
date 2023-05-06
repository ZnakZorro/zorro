const zeroPad = (num, places) => String(num).padStart(places, '0');
console.log(zeroPad(5, 4)); // "0005"

Number.prototype.pad = function(size) {
    let s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}
(9).pad();  //returns "09"
