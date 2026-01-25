document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;

  // Set initial scales
  slides.forEach((slide, index) => {
    if (index === 0) {
      gsap.set(slide, { scale: 1 });
    } else if (index === 1) {
      gsap.set(slide, { scale: 0.2 });
    } else {
      gsap.set(slide, { scale: 0 });
    }
  });

  // Create animations for each slide (except the first one)
  slides.forEach((slide, index) => {
    if (index !== 0) {
      gsap.to(slide, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: `${(index - 1) * window.innerHeight}px top`,
          end: `${index * window.innerHeight}px top`,
          scrub: 1,
          markers: true,
        },
      });
    }
  });

  // Create scroll height
  document.body.style.height = `${totalSlides * 100}vh`;
});
