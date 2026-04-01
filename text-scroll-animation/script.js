document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const stickyBar = document.querySelector(".sticky-bar");
  const footerTrigger = document.querySelector(".trigger-footer");
  const footerTriggerHeight = footerTrigger.offsetHeight;

  function getStickyBarCenter() {
    return stickyBar.offsetTop + stickyBar.offsetHeight / 2;
  }

  document.querySelectorAll(".row").forEach((row) => {
    ScrollTrigger.create({
      trigger: row,
      start: () => `top+=${getStickyBarCenter() - 550} center`,
      end: () => `top+=${getStickyBarCenter() - 450} center`,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const maxGap = window.innerWidth < 900 ? 10 : 15;
        const minGap = window.innerWidth < 900 ? 0.5 : 1;
        const currentGap = minGap + (maxGap - minGap) * progress;
        row.style.gap = `${currentGap}em`;
      },
    });
  });

  document.querySelectorAll(".row").forEach((row) => {
    ScrollTrigger.create({
      trigger: row,
      start: () => `top+=${getStickyBarCenter() - 400} center`,
      end: () => `top+=${getStickyBarCenter() - 300} center`,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const maxGap = window.innerWidth < 900 ? 0.5 : 1;
        const minGap = window.innerWidth < 900 ? 10 : 15;
        const currentGap = minGap + (maxGap - minGap) * progress;
        row.style.gap = `${currentGap}em`;
      },
    });
  });

  ScrollTrigger.create({
    trigger: footerTrigger,
    start: "top bottom",
    end: () => `top+=${footerTriggerHeight - window.innerHeight} center`,
    scrub: true,
    onUpdate: (self) => {
      const startTop = 50;
      const endTop = 92;
      const newTop = startTop + (endTop - startTop) * self.progress;
      stickyBar.style.top = `${newTop}%`;
    },
  });
});
