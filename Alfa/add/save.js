/*
document.getElementById('wybierzPlik').addEventListener('change', function(event) {
  const plik = event.target.files[0]; // Pobieramy pierwszy wybrany plik
  if (!plik) return;

  const reader = new FileReader();

  // Co ma się stać, gdy plik zostanie już wczytany do pamięci
  reader.onload = function(e) {
    const zawartosc = e.target.result;
    console.log("Treść pliku:", zawartosc);
    document.getElementById('list-container').innerHTML += zawartosc;
    console.log(document.getElementById('list-container').innerHTML);
  };

  // Uruchomienie odczytu jako tekst
  reader.readAsText(plik);
});
*/

async function wczytajPlik() {
  // Otwiera okno wyboru pliku
  const [handle] = await window.showOpenFilePicker();
  const file = await handle.getFile();
  const tresc = await file.text();  
  console.log(tresc);
  document.getElementById('list-container').innerHTML += tresc;
}




async function zapisz(content="Hello",name='notatka.html') {
  // Otwiera systemowe okno "Zapisz jako"
  const handle = await window.showSaveFilePicker({
    suggestedName: name,
    types: [{
      description: 'Plik tekstowy',
      accept: {'text/plain': ['.html']},
    }],
  });
  
  const writable = await handle.createWritable();
  await writable.write(content);
  await writable.close();
}





