const lenis= new Lenis({
    infinite:true
});


const images= document.querySelectorAll('.img img');

function updateParallex(){
   images.forEach(img=>{
    const closetImg= img.closest('.img');
    const rect= closetImg.getBoundingClientRect();
    const scrollProgress= rect.top / window.innerHeight;
    const translateY= -scrollProgress * 100;
    img.style.transform = `translateY(${translateY}px)`;
   })
}


function raf(time){
    lenis.raf(time);
    updateParallex();
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);