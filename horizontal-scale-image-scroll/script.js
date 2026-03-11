document.addEventListener("DOMContentLoaded", () => {
  let current = 0;
  let target = 0;
  const damping = 0.08;

  const slider = document.querySelector(".slider");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");

  let maxScroll = 0;
  let slideCenters = [];

  // ---------- UTILITIES ----------

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  // ---------- PRECOMPUTE SLIDE POSITIONS ----------

  function calculateSlideCenters() {
    slideCenters = [];

    slides.forEach((slide) => {
      const center = slide.offsetLeft + slide.offsetWidth / 2;
      slideCenters.push(center);
    });

    maxScroll = Math.max(0, sliderWrapper.scrollWidth - slider.clientWidth);
  }

  // ---------- SCALE + DEPTH EFFECT ----------

  function updateSlides() {
    const screenCenter = window.innerWidth / 2;

    slides.forEach((slide, i) => {
      const slideCenter = slideCenters[i] - current;
      const distance = slideCenter - screenCenter;

      // Skip slides far outside viewport
      if (Math.abs(distance) > window.innerWidth) return;

      let scale;
      let offsetX;

      if (distance > 0) {
        scale = Math.min(1.75, 1 + distance / window.innerWidth);

        offsetX = (scale - 1) * 400;
      } else {
        scale = Math.max(0.5, 1 - Math.abs(distance) / window.innerWidth);

        offsetX = 0;
      }

      slide.style.transform = `translateX(${offsetX}px) scale(${scale})`;
    });
  }

  // ---------- MAIN ANIMATION LOOP ----------

  function update() {
    current = lerp(current, target, damping);

    gsap.set(sliderWrapper, {
      x: -current,
    });

    updateSlides();

    requestAnimationFrame(update);
  }

  // ---------- EVENTS ----------

  window.addEventListener("wheel", (e) => {
    target += e.deltaY;

    target = clamp(target, 0, maxScroll);
  });

  window.addEventListener("resize", () => {
    calculateSlideCenters();
  });

  // ---------- INIT ----------

  calculateSlideCenters();
  update();
});
