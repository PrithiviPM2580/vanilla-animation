document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const container = document.querySelector(".horizontal-container");

  // Animate horizontal scroll
  gsap.to(container, {
    x: () => -(container.scrollWidth - window.innerWidth), // move left by total width
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => "+=" + container.scrollWidth,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      markers: true,
    },
  });
});
