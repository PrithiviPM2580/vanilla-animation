document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut", duration: 3.5 },
  });

  tl.from(".clip-top , .clip-bottom", {
    duration: 2,
    delay: 0.2,
    height: "50vh",
  })
    .to(
      ".marquee",
      {
        duration: 2,
        top: "50%",
      },
      "-=1.5"
    )
    .from(
      ".clip-top .marquee, .clip-bottom .marquee",
      {
        duration: 5,
        left: "100%",
        ease: "power3.inOut",
      },
      "-=2.5"
    )
    .from(
      ".clip-center .marquee",
      {
        duration: 5,
        left: "-50%",
        ease: "power3.inOut",
      },
      "<"
    )
    .to(
      ".clip-top",
      {
        duration: 1,
        clipPath: "inset(0 0 100% 0)",
      },
      "-=1"
    )
    .to(
      ".clip-bottom",
      {
        duration: 1,
        clipPath: "inset(100% 0 0 0)",
      },
      "<"
    )
    .to(
      "clip-top .marquee, .clip-bottom .marquee, .clip-center .marquee span",
      {
        duration: 1,
        opacity: 0,
        ease: "power2.inOut",
      },"-=.9.8"
    );
});
