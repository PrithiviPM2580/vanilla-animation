document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  const container = document.querySelector(".container");
  let currentPos = window.pageYOffset;

  const callDistort = () => {
    const newPos = window.pageYOffset;
    const diff = newPos - currentPos;
    const speed = diff * 0.35;

    container.style.transform = `skewY(${speed}deg)`;
    currentPos = newPos;
    requestAnimationFrame(callDistort);
  };
  callDistort();
});
