document.addEventListener("DOMContentLoaded", () => {
  const text = document.querySelectorAll(".text");
  const btn = document.querySelector(".btn");

  btn.addEventListener("click", () => {
    const tl = gsap.timeline();

    tl.to(btn, {
      opacity: 0,
      y: -40,
      ease: "expo.inOut",
      duration: 1,
    })
      .to(
        text,
        {
          x: 500,
          duration: 2,
          stagger: 0.05,
          ease: "expo.inOut",
        },
        "-=1.1"
      )
      .to(
        ".text-wrapper",
        {
          y: -600,
          scale: 3.5,
          rotate: -90,
          ease: "expo.inOut",
          duration: 2,
        },
        "-=1.5"
      )
      .to(
        ".text h1",
        {
          opacity: 1,
          ease: "expo.inOut",
          duration: 1,
        },
        "-=1"
      )
      .to(text, {
        x: -1500,
        duration: 2,
        ease: "expo.inOut",
        stagger: 0.05,
      })
      .to(
        ".header",
        {
          y: "0%",
          ease: "expo.inOut",
          duration: 1.5,
        },
        "-=1.8"
      );
  });
});
