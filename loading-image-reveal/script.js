document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader");

  const tl = gsap.timeline();

  tl.from(loader, {
    duration: 0.5,
    y: 80,
    scaleY: 0,
    ease: "power1.inOut",
    delay: 0.5,
    transformOrigin: "50% 100%",
  }).to(loader, {
    duration: 0.5,
    y:-80,
    scaleY:'0',
    ease: "power1.inOut",
    transformOrigin: "0% -100%",
  });
});
