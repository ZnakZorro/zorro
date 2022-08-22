console.log("Slider")



class Slider {
  
  constructor(idSlide,option,callback) {
    this.idSlide = idSlide;
    this.option = option;
    this.callback = callback;
	this.setSlider();
	this.idSlide.addEventListener("input",(e)=>{
		callback(e.target.value)
	},false)
  }
  
  setSlider() {
    //console.log(this)
    this.idSlide.min=0;
    this.idSlide.max=100;
    this.idSlide.value=this.option.initialStep;
    this.idSlide.steps=this.option.steps;
	return this;
  }  
  setName(name) {
    this.name = name;
    // Return this for chaining
    return this;
  }
  
}

/******************/
/*
class Product {
  
  constructor(name) {
    this.name = name;
  }
  
  setName(name) {
    this.name = name;
    // Return this for chaining
    return this;
  }
  
  setPrice(price) {
    this.price = price;
    // Return this for chaining
    return this;
  }
  
  save() {
    console.log(this.name, this.price, this.units);
    // Return this for chaining
    return this;
  }
}

const product = new Product("T-Shirt")
    .setName("Jeans")
    .setPrice(31.99)
    .save();
*/
//console.log(product);

//const product2 = new Product("Koszula").setName("Bawełna").setPrice(55).save();
//console.log(product2);
//console.log(product2.name);
//console.log(product2.price);