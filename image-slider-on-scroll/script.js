document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));

  gsap.ticker.lagSmoothing(0);

  const slides = gsap.utils.toArray(".slide");

  // Initial state
  slides.forEach((slide, i) => {
    gsap.set(slide, {
      scale: i === 0 ? 1 : 0.001,
      transformOrigin: "center center",
      willChange: "transform",
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".slider", // real element
      start: "top top",
      end: () => `+=${slides.length * window.innerHeight}`,
      scrub: true,
      pin: true,
      invalidateOnRefresh: true,
      // markers: true
    },
  });

  slides.forEach((slide, i) => {
    if (i > 0) {
      tl.to(slide, { scale: 1, ease: "none" }, i);
    }
  });
});
