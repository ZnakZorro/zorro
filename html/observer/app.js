
const the_animation = document.querySelectorAll('.animation');
console.log(the_animation)

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        //console.log(entry.target,entry.target.dataset.src)
        if (entry.isIntersecting) {
            console.log(entry.target.dataset.src)
            entry.target.src = entry.target.dataset.src;
            entry.target.classList.add('scroll-animation')
        }
            else {
                entry.target.classList.remove('scroll-animation')
            }
        
    })
},
{ threshold: 0.5});


for (let i = 0; i < the_animation.length; i++) {
    const elements = the_animation[i];
    console.log(elements)
    observer.observe(elements);
} 
