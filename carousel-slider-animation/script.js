// document.addEventListener("DOMContentLoaded", () => {
//   const sliderContent = [
//     "LuminaPad",
//     "PulseEar",
//     "ZenithMatch",
//     "AeroCharge",
//     "EchoSphere",
//     "NovaGlide",
//   ];

//   let currentImageIndex = 2;
//   let currentContentIndex = 1;
//   const totalImages = 6;
//   let isAnimating = false;
//   const isMobile = window.innerWidth <= 900;

//   function splitTextIntoSpans(selector) {
//     const elements = document.querySelectorAll(selector);
//     elements.forEach((element) => {
//       const text = element.textContent;
//       const spans = text
//         .split("")
//         .map((char) => `<span>${char}</span>`)
//         .join("");
//       element.innerHTML = spans;
//     });
//   }

//   gsap.to(".slide-next-img", {
//     clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//     duration: 1.5,
//     ease: "power3.out",
//     delay: 1,
//   });

//   document.addEventListener("click", () => {
//     if (isAnimating) return;
//     isAnimating = true;

//     splitTextIntoSpans(".slider-content-active h1");
//     gsap.to(".slide-active img", {
//       scale: 2,
//       duration: 2,
//       ease: "power3.out",
//     });

//     gsap.to(".slider-content-active h1 span", {
//       top: isMobile ? "-100px" : "-175px",
//       stagger: 0.05,
//       ease: "power3.out",
//       duration: 0.5,
//       onComplete: () => {
//         gsap.to(".slider-content-active", {
//           top: isMobile ? "-100px" : "-175px",
//           duration: 0.25,
//           ease: "power3.out",
//         });
//       },
//     });

//     splitTextIntoSpans(".slider-content-next h1");
//     gsap.set(".slider-content-next h1 span", {
//       top: isMobile ? "100px" : "175px",
//     });

//     gsap.to(".slider-content-next", {
//       top: "0",
//       duration: 1.125,
//       ease: "power3.out",
//       onComplete: () => {
//         document.querySelector(".slider-content-active").remove();
//         gsap.to(".slider-content-next h1 span", {
//           top: 0,
//           stagger: 0.05,
//           ease: "power3.out",
//           duration: 0.5,
//         });

//         const nextContent = document.querySelector(".slider-content-next");
//         nextContent.classList.remove("slider-content-next");
//         nextContent.classList.add("slider-content-active");
//         nextContent.style.top = "0";

//         currentContentIndex = (currentContentIndex + 1) % totalImages;
//         const nextContentText = sliderContent[currentContentIndex];
//         const newContentHTML = `<div class="slider-content-next" style="top: 200px;"><h1>${nextContentText}</h1></div>`;
//         document
//           .querySelector(".slider-content")
//           .insertAdjacentHTML("beforeend", newContentHTML);
//       },
//     });

//     currentImageIndex = (currentImageIndex % totalImages) + 1;

//     const newSlideHTML = `
//     <div class="slide-next">
//       <div class="slide-next-img">
//         <img src="../images/img${currentImageIndex}.png" alt="Image ${currentImageIndex}">
//       </div>
//     </div>
//     `;

//     document
//       .querySelector(".slider")
//       .insertAdjacentHTML("beforeend", newSlideHTML);

//     gsap.to(".slider .slide-next:last-child .slide-next-img", {
//       clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//       duration: 1.5,
//       ease: "power3.out",
//       delay: 0.5,
//     });

//     const slideNextImg = document.querySelector(".slide-next-img");
//     gsap.to(slideNextImg, {
//       width: "100%",
//       height: "100svh",
//       duration: 2,
//       ease: "power3.out",
//       onComplete: () => {
//         const currentActiveSlide = document.querySelector(".slide-active");
//         if (currentActiveSlide) {
//           currentActiveSlide.parentNode.removeChild(currentActiveSlide);
//         }

//         const nextSlide = document.querySelector(".slide-next");
//         if (nextSlide) {
//           nextSlide.classList.remove("slide-next");
//           nextSlide.classList.add("slide-active");

//           const nextSlideImg = nextSlide.querySelector(".slide-next-img");
//           if (nextSlide) {
//             nextSlideImg.classList.remove("slide-next-img");
//           }
//         }
//         setTimeout(() => {
//           isAnimating = false;
//         }, 500);
//       },
//     });
//   });
// });
// document.addEventListener("DOMContentLoaded", () => {
//   const sliderContent = [
//     "LuminaPad",
//     "PulseEar",
//     "ZenithMatch",
//     "AeroCharge",
//     "EchoSphere",
//     "NovaGlide",
//   ];

//   let currentIndex = 0;
//   let isAnimating = false;
//   const total = sliderContent.length;
//   const isMobile = window.innerWidth <= 900;

//   const slider = document.querySelector(".slider");
//   const contentWrapper = document.querySelector(".slider-content");

//   // 🔹 Split text into spans
//   function splitText(el) {
//     const text = el.textContent;
//     el.innerHTML = text
//       .split("")
//       .map((char) => `<span>${char}</span>`)
//       .join("");
//   }

//   // 🔹 Animate current text OUT
//   function animateTextOut() {
//     const active = document.querySelector(".slider-content-active h1");
//     splitText(active);

//     return gsap.to(active.querySelectorAll("span"), {
//       top: isMobile ? "-100px" : "-175px",
//       stagger: 0.05,
//       duration: 0.5,
//       ease: "power3.out",
//     });
//   }

//   // 🔹 Animate new text IN
//   function animateTextIn(container) {
//     const h1 = container.querySelector("h1");
//     splitText(h1);

//     gsap.set(h1.querySelectorAll("span"), {
//       top: isMobile ? "100px" : "175px",
//     });

//     gsap.to(h1.querySelectorAll("span"), {
//       top: 0,
//       stagger: 0.05,
//       duration: 0.5,
//       ease: "power3.out",
//     });
//   }

//   // 🔹 Create next slide (center preview)
//   function createNextSlide(index) {
//     const html = `
//       <div class="slide-next">
//         <div class="slide-next-img">
//           <img src="../images/img${index + 1}.png" />
//         </div>
//       </div>
//     `;
//     slider.insertAdjacentHTML("beforeend", html);
//   }

//   // 🔹 Create next text
//   function createNextText(index) {
//     const html = `
//       <div class="slider-content-next">
//         <h1>${sliderContent[index]}</h1>
//       </div>
//     `;
//     contentWrapper.insertAdjacentHTML("beforeend", html);
//   }

//   // 🔥 MAIN ANIMATION
//   function runAnimation() {
//     if (isAnimating) return;
//     isAnimating = true;

//     const activeImg = document.querySelector(".slide-active img");

//     // 1️⃣ Zoom current image
//     gsap.to(activeImg, {
//       scale: 2,
//       duration: 2,
//       ease: "power3.out",
//     });

//     // 2️⃣ Animate text out
//     animateTextOut();

//     // 3️⃣ Update index
//     currentIndex = (currentIndex + 1) % total;

//     // 4️⃣ Create next slide + text
//     createNextSlide(currentIndex);
//     createNextText(currentIndex);

//     const nextSlide = document.querySelector(".slide-next:last-child");
//     const nextSlideImg = nextSlide.querySelector(".slide-next-img");
//     const nextText = document.querySelector(".slider-content-next");

//     // 🔴 IMPORTANT: reset initial clip-path (center point)
//     gsap.set(nextSlideImg, {
//       clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
//     });

//     // 5️⃣ Reveal from center
//     gsap.to(nextSlideImg, {
//       clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//       duration: 1.5,
//       ease: "power3.out",
//       delay: 0.5,
//     });

//     // 6️⃣ Expand to full screen
//     gsap.to(nextSlideImg, {
//       width: "100%",
//       height: "100svh",
//       duration: 2,
//       ease: "power3.out",
//       delay: 0.5,
//       onComplete: () => {
//         // remove old slide
//         document.querySelector(".slide-active")?.remove();

//         // promote next → active
//         nextSlide.classList.replace("slide-next", "slide-active");
//         nextSlideImg.classList.remove("slide-next-img");

//         isAnimating = false;
//       },
//     });

//     // 7️⃣ Move next text container up
//     gsap.to(nextText, {
//       top: "0",
//       duration: 1,
//       ease: "power3.out",
//       onComplete: () => {
//         document.querySelector(".slider-content-active")?.remove();

//         nextText.classList.replace(
//           "slider-content-next",
//           "slider-content-active",
//         );

//         animateTextIn(nextText);
//       },
//     });
//   }

//   // 🔹 Initial preview animation
//   gsap.to(".slide-next-img", {
//     clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//     duration: 1.5,
//     ease: "power3.out",
//     delay: 1,
//   });

//   // 🔹 Click trigger
//   document.addEventListener("click", runAnimation);
// });

document.addEventListener("DOMContentLoaded", () => {
  const sliderContent = [
    "LuminaPad",
    "PulseEar",
    "ZenithMatch",
    "AeroCharge",
    "EchoSphere",
    "NovaGlide",
  ];

  let currentImageIndex = 2;
  let currentContentIndex = 1;
  const totalImages = 6;
  let isAnimating = false;
  const isMobile = window.innerWidth <= 900;

  const slider = document.querySelector(".slider");
  const contentWrapper = document.querySelector(".slider-content");

  function splitText(selector) {
    const el = document.querySelector(selector);
    const text = el.textContent;

    el.innerHTML = text
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("");
  }

  // initial preview open
  gsap.to(".slide-next-img", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1.5,
    ease: "power3.out",
    delay: 1,
  });

  document.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;

    // 🔹 TEXT OUT
    splitText(".slider-content-active h1");

    gsap.to(".slider-content-active h1 span", {
      top: isMobile ? "-100px" : "-175px",
      stagger: 0.05,
      duration: 0.5,
      ease: "power3.out",
    });

    // 🔹 IMAGE ZOOM OUT
    gsap.to(".slide-active img", {
      scale: 2,
      duration: 2,
      ease: "power3.out",
    });

    // 🔹 CREATE NEXT SLIDE (APPEND)
    currentImageIndex = (currentImageIndex % totalImages) + 1;

    slider.insertAdjacentHTML(
      "beforeend",
      `
      <div class="slide-next">
        <div class="slide-next-img">
          <img src="../images/img${currentImageIndex}.png">
        </div>
      </div>
    `,
    );

    // 🔴 IMPORTANT: target FIRST preview (not last)
    const slideNextImg = document.querySelector(".slide-next-img");

    // 🔹 REVEAL CENTER IMAGE
    gsap.to(slideNextImg, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5,
    });

    // 🔹 EXPAND IMAGE
    gsap.to(slideNextImg, {
      width: "100%",
      height: "100svh",
      duration: 2,
      ease: "power3.out",
      onComplete: () => {
        document.querySelector(".slide-active")?.remove();

        const nextSlide = document.querySelector(".slide-next");
        nextSlide.classList.replace("slide-next", "slide-active");

        nextSlide
          .querySelector(".slide-next-img")
          ?.classList.remove("slide-next-img");

        isAnimating = false;
      },
    });

    // 🔹 TEXT IN
    currentContentIndex = (currentContentIndex + 1) % totalImages;

    contentWrapper.insertAdjacentHTML(
      "beforeend",
      `
      <div class="slider-content-next">
        <h1>${sliderContent[currentContentIndex]}</h1>
      </div>
    `,
    );

    const nextText = document.querySelector(".slider-content-next");

    gsap.to(nextText, {
      top: "0",
      duration: 1,
      ease: "power3.out",
      onComplete: () => {
        document.querySelector(".slider-content-active")?.remove();

        nextText.classList.replace(
          "slider-content-next",
          "slider-content-active",
        );

        splitText(".slider-content-active h1");

        gsap.fromTo(
          ".slider-content-active span",
          { top: isMobile ? "100px" : "175px" },
          {
            top: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "power3.out",
          },
        );
      },
    });
  });
});
