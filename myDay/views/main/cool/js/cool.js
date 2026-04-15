 
  
  function drawIMGctx(ctx,src,w,h) {
  	
  //var ctx = document.getElementById('canvas').getContext('2d');
  var img = new Image();
  img.onload = function() {
  	console.log(w,h,img.width,img.height);
  	let scaleW = img.width/w;
  	let scaleH = img.height/h;
  	let scale = Math.max(scaleW,scaleH);
  	console.log("scaleW,scaleH=",scaleW,scaleH,"scale=",scale);
  	scale=1
	//ctx.drawImage(img, 0, 0, w*scaleW,h*scaleH);
	ctx.drawImage(img, 0, 0,img.width,img.height, 0,0,w,h);
    //drawImage(image, dx, dy)
	//drawImage(image, dx, dy, dWidth, dHeight)
	//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  };
  img.src = src;
}


  // Draw placeholder images on canvas elements
function drawPlaceholder(canvas, text, color,img) {
	photo0 = img;
	//console.log(img)
	 //document.querySelector("#galla").innerHTML = `<img src="${img}" />`;
	 //return;
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width || 600;
  canvas.height = rect.height || 400;

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, adjustBrightness(color, -20));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Text
  ctx.fillStyle = "white";
  ctx.font = "bold 24px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  //document.querySelector("#galla").innerHTML = `<img src="${img}" />`;
  drawIMGctx(ctx,img,canvas.width,canvas.height);
}

function adjustBrightness(color, amount) {
  const num = parseInt(color.slice(1), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

let photo0='./gallery1/2.jpg';
console.log(photo0);
// Initialize photo transform canvas
const photoCanvas = document.getElementById("photo");
drawPlaceholder(photoCanvas, "Mountain Landscape", "#4A90E2",photo0);

// Custom command handler for photo transforms
let currentRotation = 0;
let isFlipped = false;

photoCanvas.addEventListener("command", (e) => {
  if (e.command === "--flip-horizontal") {
    isFlipped = !isFlipped;
    photoCanvas.style.transform = `rotate(${currentRotation}deg) scaleX(${
      isFlipped ? -1 : 1
    })`;
  } else if (e.command === "--rotate-90") {
    currentRotation += 90;
    photoCanvas.style.transform = `rotate(${currentRotation}deg) scaleX(${
      isFlipped ? -1 : 1
    })`;
  } else if (e.command === "--reset") {
    currentRotation = 0;
    isFlipped = false;
    photoCanvas.style.transform = "none";
  }
});

// Initialize gallery images
const galleryImages = [
  {img:"./gallery1/2.jpg", text: "Nature Scene 1", color: "#2ECC71" },
  {img:"./gallery1/1.jpg", text: "Mountain View", color: "#4A90E2" },
  {img:"./gallery1/3.jpg", text: "Forest Path", color: "#27AE60" },
  {img:"./gallery1/4.jpg", text: "Sunset Sky", color: "#E67E22" }
];
let currentIndex = 0;
let photo = galleryImages[currentIndex].img;
//console.log(photo)
const galleryCanvas = document.getElementById("current-image");
drawPlaceholder(galleryCanvas, galleryImages[0].text, galleryImages[0].color, galleryImages[0].img);

// Custom command handler for image gallery
galleryCanvas.addEventListener("command", (e) => {
  if (e.command === "--next") {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    drawPlaceholder(
      galleryCanvas,
      galleryImages[currentIndex].text,
      galleryImages[currentIndex].color,
      galleryImages[currentIndex].img
    );
  } else if (e.command === "--previous") {
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    drawPlaceholder(
      galleryCanvas,
      galleryImages[currentIndex].text,
      galleryImages[currentIndex].color,
      galleryImages[currentIndex].img      
    );
  }
});

// Redraw on window resize
window.addEventListener("resize", () => {
  drawPlaceholder(photoCanvas, "Mountain Landscape", "#4A90E2",photo0);
  drawPlaceholder(
    galleryCanvas,
    galleryImages[currentIndex].text,
    galleryImages[currentIndex].color,
    photo0
  );
});

    const setThemeMode=(mode)=>{
		if (mode === 'light') {
		    html.setAttribute('data-theme', 'light');
		    document.body.classList.remove('dark-mode');
		} else {
		    html.setAttribute('data-theme', 'dark');
		    document.body.classList.add('dark-mode');
		}
		console.log("set=",mode)
		localStorage.setItem("datatheme", mode);
    }
    	
    	
        const toggleButton = document.getElementById('theme-toggle');
        const html = document.documentElement; // Get the <html> element

        toggleButton.addEventListener('click', () => {
            if (html.getAttribute('data-theme') === 'dark') {
            	setThemeMode("light");
                //html.setAttribute('data-theme', 'light');
                //document.body.classList.remove('dark-mode');
                //localStorage.setItem("data-theme", "light");
            } else {
            	setThemeMode("dark");
                //html.setAttribute('data-theme', 'dark');
                //document.body.classList.add('dark-mode');
                //localStorage.setItem("data-theme", "dark");
            }
        });
        
    const modeView=(ten)=>{
    	//console.log(ten.checked);
    	toggleButton.click();
    }


	document.addEventListener("DOMContentLoaded",function(){
		let mode = localStorage.getItem("datatheme");
		setThemeMode(mode)
		console.log("dom=",mode);
	});

