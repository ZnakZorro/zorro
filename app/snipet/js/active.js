const setActive=(ten)=>{
      let parent = ten.parentElement;
      let keys   = parent.querySelectorAll("button");
      keys.forEach(key=>key.classList.remove("active"));
      ten.classList.add("active");
}


      document.querySelectorAll("#klawisze button").forEach(b=>b.classList.remove("active"));
      ten.classList.add("active");
