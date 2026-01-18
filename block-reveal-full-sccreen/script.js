document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay");
  const squareContainer = document.querySelector(".square-container");
  const toggleBtn = document.querySelector(".toggle");

  const squareSize = 100;
  let squares = [];
  let overlayVisible = false;
  let tl = null;

  gsap.set(overlay, { opacity: 0, visibility: "hidden", zIndex: -1 });

  function createSquares() {
    const cols = Math.ceil(window.innerWidth / squareSize);
    const rows = Math.ceil(window.innerHeight / squareSize);
    const total = cols * rows;

    squareContainer.style.width = `${cols * squareSize}px`;
    squareContainer.style.height = `${rows * squareSize}px`;

    if (squares.length === total) return;

    squareContainer.innerHTML = "";
    squares = [];

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < total; i++) {
      const square = document.createElement("div");
      square.className = "square";
      fragment.appendChild(square);
      squares.push(square);
    }

    squareContainer.appendChild(fragment);
  }

  function animateSquares(show) {
    // 🔥 THIS is what was missing
    if (tl) tl.kill();

    gsap.set(squares, { opacity: 0 });

    tl = gsap.timeline();

    tl.to(squares, {
      opacity: 1,
      duration: 0.15,
      stagger: { each: 0.004, from: "random" },
    }).to(squares, {
      opacity: 0,
      duration: 0.15,
      stagger: { each: 0.004, from: "random" },
    });

    tl.to(overlay, {
      opacity: show ? 1 : 0,
      visibility: show ? "visible" : "hidden",
      zIndex: show ? 0 : -1,
      duration: 0.2,
    });
  }

  toggleBtn.addEventListener("click", () => {
    createSquares();
    animateSquares(!overlayVisible);
    overlayVisible = !overlayVisible;
  });
});
