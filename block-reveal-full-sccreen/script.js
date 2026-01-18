document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay");

  gsap.set(overlay, { opacity: 0 });

  const squareContainer = document.querySelector(".square-container");
  const squareSize = 100;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const cols = Math.ceil(screenWidth / squareSize);
  const rows = Math.ceil(screenHeight / squareSize);
  const totalSquares = cols * rows;

  squareContainer.style.width = `${cols * squareSize}px`;
  squareContainer.style.height = `${rows * squareSize}px`;

  let squares = [];

  function createSquare() {
    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      squareContainer.appendChild(square);
      squares.push(square);
    }
  }

  function animateSquares() {
    gsap.fromTo(
      squares,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 0.5,
        duration: 0.0005,
        stagger: {
          each: 0.004,
          from: "random",
        },
      },
    );

    gsap.to(squares, {
      opacity: 0,
      delay: 1.5,
      duration: 0.0005,
      stagger: {
        each: 0.004,
        from: "random",
      },
    });
  }

  let overlayVisible = false;

  document.querySelector(".toggle").addEventListener("click", () => {
    console.log("clicked");
    squareContainer.innerHTML = "";
    squares = [];
    createSquare();
    animateSquares();

    gsap.to(overlay, 0.025, {
      opacity: overlayVisible ? 0 : 1,
      visibility: overlayVisible ? "hidden" : "visible",
      delay: 1.15,
    });

    gsap.to(overlay, {
      zIndex: overlayVisible ? -1 : 0,
      delay: overlayVisible ? 0 : 2,
    });

    overlayVisible = !overlayVisible;
  });
});
