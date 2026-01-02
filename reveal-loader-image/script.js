document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".image");

  const splitText = new SplitText(".text h1", { type: "words,chars" });

  images.forEach((img, index) => {
    if (index !== 0) {
      gsap.set(img, {
        y: "100%",
      });
    }
  });

  const tl = gsap.timeline();

  tl.to(".image", {
    y: "0%",
    opacity: 1,
    duration: 1,
    ease: "power2.easeOut",
    stagger: 0.5,
  })
    .to(".images", {
      y: "25rem",
      scale: 3,
      duration: 1,
      ease: "power2.easeIn",
      transformOrigin: "center top",
      delay: 1,
    })
    .to(
      splitText.chars,
      {
        y: "100%",
        duration: 0.6,
        ease: "power2.easeOut",
        stagger: 0.05,
      },
      "-=0.9"
    )
    .from(
      ".nav",
      {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.2,
      },
      "-=0.5"
    );
});
