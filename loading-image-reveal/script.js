document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader");
  const wrapper = document.querySelector(".wrapper");

  // Set initial state of loader to prevent flicker
  gsap.set(loader, {
    y: 80,
    scaleY: 0,
    transformOrigin: "50% 100%",
  });

  const tl = gsap.timeline();

  tl.to(loader, {
    duration: 0.5,
    y: 0,
    scaleY: 1,
    opacity: 1,
    ease: "power1.inOut",
    delay: 0.5,
  })
    .to(loader, {
      duration: 0.5,
      y: -80,
      scaleY: "0",
      ease: "power1.inOut",
      transformOrigin: "50% -100%",
      opacity: 1,
    })
    .to(wrapper, {
      duration: 0.6,
      top: "-100%",
      ease: "power1.inOut",
      delay: 0.2,
    })
    .from(
      "h1",
      {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power1.out",
      },
      "-=0.3"
    )
    .to(
      ".box",
      {
        duration: 1,
        y: "-100%",
        ease: "power1.out",
      },
      "<"
    )
    .from(
      ".navs",
      {
        duration: 1,
        y: 50,
        ease: "power1.out",
        opacity: 0,
      },
      "<"
    );
});
