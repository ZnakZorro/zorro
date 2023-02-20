
const $=(y)=>document.querySelector(y);
const $$=(y)=>document.querySelectorAll(y);

function handleFileSelect(event) {
        var file = event.target.files[0]; 	// wczytanie wybranego pliku
        if (!file) {return;}			// Sprawdzenie, czy plik jest poprawny
        
        var reader = new FileReader();		// Wczytanie zawartości pliku
        reader.onload = function(event) {
          var contents = event.target.result;
          console.log("Zawartość pliku: " + contents);
	  //document.querySelector('#editor').innerHTML = contents;
	  document.querySelector('.ck-body-wrapper').innerHTML = contents;
	  editor.setData(contents);
        };
        reader.readAsText(file);
      }

	let fileName=null;
        let editor;
	    
	    
	const installEditor=()=>{
		ClassicEditor
		    .create(document.querySelector('#editor'))
		    .then(newEditor => {
			editor = newEditor;
		    } )
		    .catch( error => {
			console.error( error );
		    } );

	}	    
	    
		//eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
		let remoteURL = new URLSearchParams(window.location.search).get("url");
		if (remoteURL){
			fetch(remoteURL)
			.then(ret => {return ret.text()})
			.then(out => {
				console.log(remoteURL)
				fileName = remoteURL.split("/").pop();
				let ext  = remoteURL.split(".").pop()
				out = formatTXT2HTMLext(out,ext);
				//document.querySelector(".ck-content").textContent = out;
				document.querySelector('#editor').innerHTML = out;
				installEditor();
			})
			.catch(e => {console.log(e)})	

			//console.log(document.querySelector('#editor'))
			//console.log(document.querySelector('#editor div'))
			//console.log(document.querySelector('#editor div div'))

		} else installEditor();
	    //eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

	    


	//https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/saving-data.html
	document.querySelector('#save').addEventListener( 'click', () => {
		console.log("#save",localStorageName);
	    	let content = editor.getData();
		localStorage.setItem(localStorageName, content);
	} );        
	document.querySelector('#read').addEventListener( 'click', () => {
		console.log("#read",localStorageName);
	    	let content = localStorage.getItem(localStorageName);
		editor.setData(content);
		document.querySelector('.ck-body-wrapper').innerHTML = content;
	} );        
	document.querySelector( '#submit' ).addEventListener( 'click', () => {
		console.log("#submit",localStorageName);
		zapisz(editor.getData());
	} );        

        let zapisz=(content)=>{
		let titleMatch1 = new RegExp("<h1[^>]*>(.*?)<\/h1>");
		let titleMatch2 = new RegExp("<h2[^>]*>(.*?)<\/h2>");
   		let res1 = content.match(titleMatch1);
		let res2 = content.match(titleMatch2);
		console.log("#84",res1,res2);
		let date = (new Date()).toLocaleString().replace(/[^\w\s]| /gi, '_').replace("__","_");    
		let nameOfFile = localStorageName+"-"+date+".html";
		if (fileName) nameOfFile=fileName;
		let filename = prompt("Nazwa pliku",nameOfFile);

		let title = getTitle(content);
		console.log("#128",filename,title);
		if(!filename) return;
		var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
		saveAs(blob, filename);		
        }

 
   
function getTitle(html){
   let titleMatch = new RegExp("<h2[^>]*>(.*?)<\/h2>");
   let res = html.match(titleMatch);
   let title = null;
   if (res && res[1]) title = res[1];
   if (title){
      title  = title.substring(0,63);
      title = title.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g,'_');  
      var dict = {"ą":"a","ć":"c","ę":"e","ó":"o","ł":"l","ń":"n","ż":"z","ź":"z","Ą":"A","Ć":"C","Ę":"E","Ó":"O","Ł":"L","Ń":"N","Ż":"Z","Ź":"Z"}
      title = title.replace(/[^\w ]/g, function(char) {return dict[char] || char;});	
   }
   return title;
}   
   
function submitHTML(){   
   let html   = document.getElementById('editor').innerHTML;
	console.log("html=");console.log(html);
   let title  = getTitle(html) || 'htmlWWW';
	console.log(title);
   let header = '<html lang="pl">\n<head>\n<meta charset="utf-8"><title>'+title+'</title>\n</head>\n<body>\n';
   let footer = '\n</body>\n</html>\n';
       html = html.replace(/\<p/gi,'\n<p');
       html = html.replace(/\<h/gi,'\n<h');
       html = html.replace(/\<div/gi,'\n<div');
       html = header + html + footer;
	console.log(html);
   
         var newBlob = new Blob([html], {type: "text/html"})
         if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
         } 

     const data = window.URL.createObjectURL(newBlob);
     var link = document.createElement('a');
     link.href = data;
     link.download = title+".html";
     link.click();
     setTimeout(function(){
       window.URL.revokeObjectURL(data);
     },100)
}

// domready dom ready
document.addEventListener("DOMContentLoaded",function(){
	let content = localStorage.getItem(localStorageName);
	console.log(localStorageName)
	if (content){
		editor.setData(content);
		document.querySelector('.ck-body-wrapper').innerHTML = content;
	}
});

/******************************/
const nameThis=(ten)=>{
	console.log(ten.textContent);
}
