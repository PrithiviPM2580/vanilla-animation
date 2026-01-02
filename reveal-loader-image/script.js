document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".image");

  const splitText = new SplitText("h1", { type: "words,chars" });

  images.forEach((img, index) => {
    if (index !== 0) {
      gsap.set(img, {
        y: "100%",
      });
    }
  });

  const tl = gsap.timeline();

  tl.to(".image", {
    y: "0%",
    opacity: 1,
    duration: 1,
    ease: "power2.easeOut",
    stagger: 0.5,
  })
    .to(".images", {
      y: "25rem",
      scale: 3,
      duration: 1,
      ease: "power2.easeIn",
      transformOrigin: "center top",
      delay: 1,
    })
    .to(splitText.chars, {
      y: "0%",
      duration: 1,
      ease: "power2.easeOut",
      stagger: 0.05,
    });
});
