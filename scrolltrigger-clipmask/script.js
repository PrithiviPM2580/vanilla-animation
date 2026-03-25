document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  function addImageScaleAnimation() {
    gsap.utils.toArray("section").forEach((section, index) => {
      const image = document.querySelector(`#preview-${index + 1} img`);

      const startCondition = index === 0 ? "top top" : "bottom bottom";

      gsap.to(image, {
        scrollTrigger: {
          trigger: section,
          start: startCondition,
          markers: true,
          end: () => {
            const viewportHeight = window.innerHeight;
            const sectionBottom = section.offsetTop + section.offsetHeight;
            const additionalDistance = viewportHeight * 0.5;
            const endValue =
              sectionBottom - viewportHeight + additionalDistance;
            return `+=${endValue}`;
          },
          scrub: true,
          scale: 3,
          ease: "none",
        },
      });
    });
  }

  addImageScaleAnimation();

  function animateClipPath(
    sectionId,
    previewId,
    startClipPath,
    endClipPath,
    start = "top center",
    end = "bottom top",
  ) {
    const section = document.querySelector(sectionId);
    const preview = document.querySelector(previewId);

    ScrollTrigger.create({
      trigger: section,
      start: start,
      end: end,
      onEnter: () => {
        gsap.to(preview, {
          scrollTrigger: {
            trigger: section,
            start: start,
            end: end,
            scrub: true,
          },
          clipPath: endClipPath,
          ease: "none",
        });
      },
    });
  }

  animateClipPath(
    "#section-1",
    "#preview-1",
    "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  );

  const totalSections = 7;

  for (let i = 2; i <= totalSections; i++) {
    let currentSection = `#section-${i}`;
    let prevPreview = `#preview-${i - 1}`;
    let currentPreview = `#preview-${i}`;

    animateClipPath(
      currentSection,
      prevPreview,
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      "top bottom",
      "center center",
    );

    if (i < totalSections) {
      animateClipPath(
        currentSection,
        currentPreview,
        "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "top center",
        "bottom top",
      );
    }
  }
});
