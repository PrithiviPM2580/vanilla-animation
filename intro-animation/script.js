document.addEventListener("DOMContentLoaded", function () {
  const tl = gsap.timeline({ delay: 0 });

  tl.to(".col", {
    top: 0,
    duration: 3,
    ease: "power4.inOut",
  });

  tl.to(
    ".col-1 .item",
    {
      top: 0,
      stragger: 0.25,
      duration: 3,
      ease: "power4.inOut",
    },
    "-=4",
  );

  tl.to(
    ".col-2 .item",
    {
      top: 0,
      stragger: -0.25,
      duration: 3,
      ease: "power4.inOut",
    },
    "-=4",
  );
  tl.to(
    ".col-3 .item",
    {
      top: 0,
      stragger: 0.25,
      duration: 3,
      ease: "power4.inOut",
    },
    "-=4",
  );
  tl.to(
    ".col-4 .item",
    {
      top: 0,
      stragger: -0.25,
      duration: 3,
      ease: "power4.inOut",
    },
    "-=4",
  );
  tl.to(
    ".col-5 .item",
    {
      top: 0,
      stragger: 0.25,
      duration: 3,
      ease: "power4.inOut",
    },
    "-=4",
  );
  tl.to(
    ".container",
    {
      scale: 6,
      duration: 4,
      ease: "power4.inOut",
    },
    "-=2",
  );

  tl.to(
    ".nav-item a, .title p, .slide-num p, .preview img",
    {
      top: 0,
      stagger: 0.075,
      duration: 1,
      ease: "power3.out",
    },
    "-=1.5",
  );
  tl.to(
    ".icon span, .icon-2 span",
    {
      scale: 5,
      stagger: 0.05,
      ease: "power3.out",
    },
    "-=1",
  );
});
