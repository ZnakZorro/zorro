console.log("edit.js");
            


const formatTXT2HTML=(code,ext="txt",type=null)=>{
   //console.log("6 ejs=",ext);
   let arr = code.split("\n");
   if (arr[0]) arr[0] = "<h3>"+arr[0]+"</h3>";
   if (arr[1]) arr[1] = "<b>"+arr[1]+"</b>";
   if (arr[2]) arr[2] = "<b><i>"+arr[2]+"</i></b>";
   for (let i=1; i<arr.length-1; i++){
      arr[i] = arr[i].trim();
      if (arr[i] != "") arr[i] = "<p>"+arr[i]+"</p>";
      else              arr[i] = "<br />";
   }
   //console.log("aaaaaaa=",arr);
   return arr.join("\n");
}


const formatTXT2HTMLext=(code,ext="txt",type=null)=>{
//console.log("22 ejs=",ext);   
   if      (ext==="html" || ext==="js") return code;
   else if (ext==="md")   return marked.parse(code);
   else if (ext==="txt")  return formatTXT2HTML(code);            
   else    return code;            
}


