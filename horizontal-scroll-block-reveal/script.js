document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const section = document.querySelector(".sections");
  const sections = gsap.utils.toArray(".sections section");
  const navLinks = gsap.utils.toArray(".nav-link");
  const totalSections = sections.length;

  gsap.to(section, {
    x: () => -(section.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => "+=" + section.scrollWidth,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const scrollDistance = section.scrollWidth - window.innerWidth;
        const currentScroll = progress * scrollDistance;

        // Find which section is currently in view (based on which section's center is closest to viewport center)
        let activeIndex = 0;
        let minDistance = Infinity;

        sections.forEach((sec, index) => {
          const sectionLeft = index * window.innerWidth;
          const sectionCenter = sectionLeft + window.innerWidth / 2;
          const viewportCenter = currentScroll + window.innerWidth / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            activeIndex = index;
          }
        });

        console.log(`Section ${activeIndex + 1} in view!`);

        // Remove active class from all nav links
        navLinks.forEach((link) => link.classList.remove("active"));

        // Add active class to current nav link
        if (navLinks[activeIndex]) {
          navLinks[activeIndex].classList.add("active");
        }
      },
    },
  });
});
