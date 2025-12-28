window.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");
  const img = document.querySelector("img");
  const projects = document.querySelectorAll(".project");

  // Center cursor
  gsap.set(cursor, {
    xPercent: -50,
    yPercent: -50,
    scale: 0,
    opacity: 0,
  });

  // Faster & smoother mouse tracking
  const moveCursor = gsap.quickTo(cursor, "x", {
    duration: 0.4,
    ease: "power3.out",
  });
  const moveCursorY = gsap.quickTo(cursor, "y", {
    duration: 0.4,
    ease: "power3.out",
  });

  document.addEventListener("mousemove", (e) => {
    moveCursor(e.clientX);
    moveCursorY(e.clientY);
  });

  projects.forEach((project) => {
    project.addEventListener("mouseenter", () => {
      const imgSrc = project.getAttribute("data-image");
      img.src = imgSrc;

      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.fromTo(
        img,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    });

    project.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    });
  });
});
