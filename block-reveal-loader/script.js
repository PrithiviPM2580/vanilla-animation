document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".block", {
    duration: 1,
    width: 0,
    stagger: 0.03,
    ease: "power1.easeIn",
  });
});
