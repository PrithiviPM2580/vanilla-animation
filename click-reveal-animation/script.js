document.addEventListener("DOMContentLoaded", function () {
  const thirdNav = document.querySelector(".third-nav");
  const toggleButton = document.querySelector(".toggle button");
  const navs = document.querySelectorAll(".nav");
  const toggleDiv = document.querySelector(".toggle");

  let isNavOpen = false;

  thirdNav.addEventListener("click", function () {
    if (!isNavOpen) {
      gsap.to(navs, {
        top: "0px",
        duration: 1,
        ease: "power4.inOut",
      });

      gsap.to(toggleDiv, {
        delay: 0.4,
        display: "flex",
        opacity: 1,
        duration: 0.4,
        ease: "power4.inOut",
      });

      isNavOpen = true;
    }
  });

  toggleButton.addEventListener("click", function () {
    if (isNavOpen) {
      gsap.to(".first-nav", {
        top: "0px",
        duration: 1,
        ease: "power4.inOut",
      });
      gsap.to(".second-nav", {
        top: "-100px",
        duration: 1,
        ease: "power4.inOut",
      });
      gsap.to(".third-nav", {
        top: "-200px",
        duration: 1,
        ease: "power4.inOut",
      });

      gsap.to(toggleDiv, {
        delay: 0,
        display: "none",
        opacity: 0,
        duration: 0.4,
        ease: "power4.inOut",
      });

      isNavOpen = false;
    }
  });
});
