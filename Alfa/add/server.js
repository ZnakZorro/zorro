    const save2server=async(dir,name,content)=>{  
        //console.log("=================================================")      
        //console.log("dir="+dir, "name="+name);
        //console.log("ppppppppost fetch post");
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
              //console.log("post ret");
              //console.log(data);
              //console.log(data.status+" - "+data.name)
              message(`${data.status}:${data.dir}/${data.name}`);
            })
            .catch(error => console.error(error));
    }

const serverSave=()=>{
	const content = document.getElementById('txtx').value;
	const name   = document.getElementById('title').value;
	const key = "Dom";
	console.log(key,name,content);
	//save2server(key,name+'_'+dateDayName(true)+ext,content);
	save2server(key,name+'.txt',content);
}

    const saveAll=async(ten=null,item=null)=>{
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

