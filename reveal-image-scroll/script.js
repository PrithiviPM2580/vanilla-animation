document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const bgColors = [
    "#faba4a",
    "#bb2a26",
    "#7e7d65",
    "#989682",
    "#5e4036",
    "#e33b12",
    "#252d1a",
    "#b04c0d",
  ];

  const bgColorElement = document.querySelector(".bg-color");
  const counterElement = document.querySelector(".counter p");
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  function updateScrollPercentage() {
    const scrollPosition = window.scrollY;
    const scrolledPercentage = Math.round((scrollPosition / docHeight) * 100);
    counterElement.textContent = `${scrolledPercentage}%`;
  }

  gsap.utils.toArray(".item").forEach((item, index) => {
    let img = item.querySelector(".item-img img");

    gsap.fromTo(
      img,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power1.out",
        duration: 2,
        scrollTrigger: {
          trigger: item,
          start: "center bottom",
          end: "bottom top",
          markers: true,
          toggleActions: "play none none none",
          onEnter: () => updateBackground(bgColors[index]),
          onEnterBack: () => updateBackground(bgColors[index]),
        },
      },
    );
  });

  function updateBackground(color) {
    gsap.to(bgColorElement, {
      background: `linear-gradient(0deg, ${color} 0%, rgba(252, 176, 69, 0) 100%)`,
      duration: 1,
      ease: "power1.out",
    });
  }

  window.addEventListener("scroll", updateScrollPercentage);
});
