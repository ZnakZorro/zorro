fetch("/data/cytaty.txt)
.then(r => {return r.text()})
.then(txt => {
  console.log(txt);
  let arr = txt.split("\n");
  console.log(txt);
})
.catch(e => {console.log(e)})
