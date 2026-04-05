document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".cursor");
  const cursorRing = document.querySelector(".cursor-ring");

  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  gsap.ticker.add(() => {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    gsap.set(cursor, { x: mx, y: my });
    gsap.set(cursorRing, { x: rx, y: ry });
  });
});
