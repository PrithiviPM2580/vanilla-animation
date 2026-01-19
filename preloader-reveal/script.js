// document.addEventListener("DOMContentLoaded", () => {
//   function startLoader() {
//     let counterElement = document.querySelector(".counter");
//     let currentValue = 0;

//     function updateCounter() {
//       if (currentValue === 100) return;

//       currentValue += Math.floor(Math.random() * 10) + 1;

//       if (currentValue > 100) {
//         currentValue = 100;
//       }

//       counterElement.textContent = currentValue;

//       let delay = Math.floor(Math.random() * 200) + 50;

//       setTimeout(updateCounter, delay);
//     }

//     updateCounter();
//   }

//   startLoader();

//   const tl = gsap.timeline();

//   tl.to(".counter", {
//     opacity: 0,
//     duration: 0.25,
//     delay: 3.5,
//   })
//     .to(".bar", {
//       duration: 2,
//       height: 0,
//       stagger: {
//         amount: 0.5,
//       },
//       ease: "power4.inOut",
//     })
//     .from(
//       ".h1",
//       {
//         duration: 1.5,
//         y: 700,
//         stagger: {
//           amount: 0.5,
//         },
//         ease: "power4.inOut",
//       },
//       "-=1.5",
//     )
//     .from(
//       ".hero",
//       {
//         y: 400,
//         duration: 1,
//         ease: "power4.inOut",
//       },
//       "-=1",
//     );
// });

document.addEventListener("DOMContentLoaded", () => {
  const counterElement = document.querySelector(".counter");

  function startLoader(onComplete) {
    let currentValue = 0;

    function updateCounter() {
      // Slow down near the end
      let increment =
        currentValue < 70
          ? Math.floor(Math.random() * 10) + 1
          : Math.floor(Math.random() * 3) + 1;

      currentValue = Math.min(currentValue + increment, 100);
      counterElement.textContent = currentValue;

      if (currentValue === 100) {
        onComplete?.(); // trigger GSAP safely
        return;
      }

      let delay = currentValue < 70 ? 80 : 150;
      setTimeout(updateCounter, delay);
    }

    updateCounter();
  }
  const tl = gsap.timeline({ paused: true });

  tl.to(".counter", {
    opacity: 0,
    duration: 0.25,
  })
    .to(".bar", {
      duration: 2,
      height: 0,
      stagger: 0.5,
      ease: "power4.inOut",
    })
    .from(
      ".h1",
      {
        duration: 1.5,
        y: 700,
        stagger: 0.5,
        ease: "power4.inOut",
      },
      "-=1.5",
    )
    .from(
      ".hero",
      {
        y: 400,
        duration: 1,
        ease: "power4.inOut",
      },
      "-=1",
    );
  startLoader(() => {
    tl.play();
  });
});
