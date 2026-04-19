    const save2server=async(dir,name,content)=>{  
        fetch('http://192.168.50.117:3333/cdn/doc2abc', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "dir": dir,
                "name": name,
                "content" : content
              })
            })
            .then(response => response.json())
            .then(data => {
              message(`${data.status}:${data.dir}/${data.name}`);
            })
            .catch(error => console.error(error));
    }

const serverSave=()=>{
	const content = document.getElementById('txtx').value;
	const name   = document.getElementById('title').value;
	const key = "Nota";
	console.log(key,name,content);
	save2server(key,name+'.txt',content);
	akcja("Server Save");
}

    const saveAll__________=async(ten=null,item=null)=>{
        console.log("=====saveAll===================")
        document.querySelectorAll("#btn button").forEach(async(b)=>{
            let ext = ".txt";
            let key = b.textContent;
            let nameKey = "doc.doc."+key;
            let date = dateDayName(true);
            let content = localStorage.getItem(nameKey) ? localStorage.getItem(nameKey).trim() : "";
            //console.log(key,0,content[0],1,content[1],2,content[2])
            if (content[0]==="#") ext = ".md";
            let name = key;
            if (item===null || item === key) await save2server(key,name+'_'+dateDayName(true)+ext,content);
        })
    }


const loadServ=(path)=>{
	//console.log(path);
	//http://192.168.50.117:3333/abc/DOC/Nota/Godmother%20of%20Silicon%20Valley.txt
	const u = "http://192.168.50.117:3333/abc/DOC/Nota/"+path;
	fetch(u)
		.then(r => {return r.text()})
		.then(tx => {
			//console.log(tx);
			$("#txtx").value=tx;
		})
		.catch(e => {console.log(e)})

}
	
const showNota=(data)=>{
	console.log(data);
	//let arr=[];
	let html="<ol class='dir'>";
	data.tree.children.forEach((t)=>{
		//arr.push(t.relativePath);
		//html +=`<li><a class="btn" href="">${t.relativePath}</a></li>`;
		html +=`<li><button class="btn" onclick="loadServ('${t.relativePath}')">${t.name}</button></li>`;
	});	
	html +="</ol>";
	$("#dir").innerHTML=html;
	
}	
	
    const getServer=async(dir,name,content)=>{  
    //const u="http://192.168.50.117:3333/dir/qqq/DOC";
    const u="http://192.168.50.117:3333/dir/Nota";
        fetch(u, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(response => response.json())
            .then(data => {              
              showNota(data);
            })
            .catch(error => console.error(error));
    }
	
	
	
