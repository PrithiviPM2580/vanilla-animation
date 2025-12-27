// One way to create a hover effect using offsetX and offsetY properties of mouse event

window.addEventListener("DOMContentLoaded", () => {
  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;
  const links = document.querySelectorAll("nav > .hover-this");
  const cursor = document.querySelector(".cursor");

  const addHoverWhenCursorOnLink = (e) => {
    const link = e.currentTarget;
    const span = link.querySelector("span");
    const { offsetWidth, offsetHeight } = link;
    const { offsetX, offsetY } = e;

    const moveX = (offsetX / offsetWidth - 0.5) * 50;
    const moveY = (offsetY / offsetHeight - 0.5) * 50;

    span.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const removeHoverWhenCursorLeavesLink = (e) => {
    const link = e.currentTarget;
    const span = link.querySelector("span");
    span.style.transform = "translate(0,0)";
  };

  links.forEach((link) => {
    link.addEventListener("mousemove", addHoverWhenCursorOnLink);
    link.addEventListener("mouseleave", removeHoverWhenCursorLeavesLink);
  });

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const speed = 0.1;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
});

// Another way to create a hover effect using getBoundingClientRect method

// window.addEventListener("DOMContentLoaded", () => {
//   const links = document.querySelectorAll("nav > .hover-this");
//   const cursor = document.querySelector(".cursor");

//   const addHoverWhenCursorOnLink = (e) => {
//     const link = e.currentTarget; // the link element
//     const span = link.querySelector("span"); // its span

//     const rect = link.getBoundingClientRect(); // get element position + size
//     const x = e.clientX - rect.left; // mouse X relative to link
//     const y = e.clientY - rect.top; // mouse Y relative to link

//     const moveX = (0.5 - x / rect.width) * 30;
//     const moveY = (0.5 - y / rect.height) * 30;

//     span.style.transform = `translate(${moveX}px, ${moveY}px)`;
//   };

//   const removeHoverWhenCursorLeavesLink = (e) => {
//     const link = e.currentTarget;
//     const span = link.querySelector("span");
//     span.style.transform = "translate(0,0)";
//   };

//   links.forEach((link) =>
//     link.addEventListener("mouseenter", addHoverWhenCursorOnLink)
//   );
//   links.forEach((link) =>
//     link.addEventListener("mouseleave", removeHoverWhenCursorLeavesLink)
//   );

//   window.addEventListener("mousemove", (e) => {
//     cursor.style.top = e.clientY + "px";
//     cursor.style.left = e.clientX + "px";
//   });
// });
