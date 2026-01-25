document.addEventListener("DOMContentLoaded", function () {
  const totalSlides = 5;
  const sectionheight =
    (document.body.scrollHeight - window.innerHeight) / totalSlides;

  const slides = document.querySelectorAll(".slide");

  slides.forEach((slide, index) => {
    gsap.to(slide, {
      zIndex: (progress) => {
        return progress < 0.5 ? 1 : 5 - index;
      },
      scrollTrigger: {
        start: sectionheight * index + " top",
        end: sectionheight * (index + 1) + " top",
        scrub: true,
        markers: true,
      },
    });

    gsap.fromTo(
      slide,
      {
        scale: index === 0 ? 1 : 0,
      },
      {
        scale: 1,
        scrollTrigger: {
          start: sectionheight * index + " top",
          end: sectionheight * (index + 1) + " top",
          scrub: true,
          markers: true,
        },
      },
    );

    if (index !== 0) {
      gsap.fromTo(
        slide,
        {
          scale: 2,
        },
        {
          scale: 1,
          scrollTrigger: {
            start: sectionheight * index + " top",
            end: sectionheight * (index + 1) + " top",
            scrub: true,
            markers: true,
          },
        },
      );
    }
  });
});
