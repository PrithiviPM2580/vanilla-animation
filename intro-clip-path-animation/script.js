document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button");
  const overlay = document.querySelector(".overlay");
  const images = document.querySelectorAll(".img");
  const loader = document.querySelector(".loader");

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power4.inOut" },
  });

  tl.to(overlay, {
    clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
    duration: 2,
  })
    .to(
      images,
      {
        clipPath: "polygon(0% 100%,100% 100%,100% 0%,0% 0%)",
        duration: 1,
        stagger: { amount: 1.5 },
      },
      "-=1.4",
    )
    .to(
      loader,
      { clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)", duration: 1 },
      "-=0.7",
    );

  button.addEventListener("click", () => {
    tl.restart(); // reuse same timeline
  });
});
