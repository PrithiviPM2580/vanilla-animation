document.addEventListener("DOMContentLoaded", function () {
  let target = 0;
  let current = 0;
  let ease = 0.075;

  const slider = document.querySelector(".slider");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const markerWrapper = document.querySelector(".marker-wrapper");
  const activeSlide = document.querySelector(".active-slide");

  let maxScroll = sliderWrapper.offsetWidth - window.innerWidth;

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  const x = gsap.quickTo(sliderWrapper, "x");
  const marker = gsap.quickTo(markerWrapper, "x");

  function updateActiveSliderNumber(markerMove, markerMaxMove) {
    const partWidth = markerMaxMove / 10;
    let currentPart = Math.round((markerMove - 70) / partWidth) + 1;
    currentPart = Math.min(10, currentPart);
    activeSlide.textContent = `${currentPart}/10`;
  }

  function update() {
    current = lerp(current, target, ease);
    x(-current);

    let moveRation = current / maxScroll;
    let markerMaxMove = window.innerWidth - markerWrapper.offsetWidth - 170;
    let markerMove = 70 + moveRation * markerMaxMove;
    marker(markerMove);
    updateActiveSliderNumber(markerMove, markerMaxMove);

    requestAnimationFrame(update);
  }

  window.addEventListener("resize", function () {
    maxScroll = sliderWrapper.offsetWidth - window.innerWidth;
  });

  window.addEventListener("wheel", (e) => {
    target += e.deltaY;

    target = Math.max(0, target);
    target = Math.min(maxScroll, target);
  });

  update();
});
