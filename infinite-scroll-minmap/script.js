const lenis= new Lenis({
    infinite:true
});


const images= document.querySelectorAll('.img img');
const mapContents= document.querySelectorAll('.map .content');
const sections= document.querySelectorAll('.img');
const assets= document.querySelectorAll('.map .assist .images');

function updateParallex(){
   images.forEach(img=>{
    const closetImg= img.closest('.img');
    const rect= closetImg.getBoundingClientRect();
    const scrollProgress= rect.top / window.innerHeight;
    const translateY= -scrollProgress * 100;
    img.style.transform = `translateY(${translateY}px)`;
   })
}

function updateMiniMap(){
    const scrollY= lenis.scroll;
    const totalHeight= document.body.scrollHeight - window.innerHeight;
    const scrollProgress= scrollY / totalHeight;

    mapContents.forEach(content=>{
        const translateY= -scrollProgress *(mapContents.length -1) *100;
        content.style.transform= `translateY(${translateY}%)`;
    })

    assets.forEach(asset=>{
        const translateY= -scrollProgress *(assets.length -1) *100;
        asset.style.transform= `translateY(${translateY}%)`;
    })
}


function raf(time){
    lenis.raf(time);
    updateParallex();
    updateMiniMap();
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);