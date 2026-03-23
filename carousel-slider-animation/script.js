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

  function splitTextIntoSpans(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      const text = element.textContent;
      const spans = text
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("");
      element.innerHTML = spans;
    });
  }

  gsap.to(".slide-next-img", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1.5,
    ease: "power3.out",
    delay: 1,
  });

  document.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;

    splitTextIntoSpans(".slider-content-active h1");
    gsap.to(".slide-active img", {
      scale: 2,
      duration: 2,
      ease: "power3.out",
    });

    gsap.to(".slider-content-active h1 span", {
      top: isMobile ? "-100px" : "-175px",
      stagger: 0.05,
      ease: "power3.out",
      duration: 0.5,
      onComplete: () => {
        gsap.to(".slider-content-active", {
          top: isMobile ? "-100px" : "-175px",
          duration: 0.25,
          ease: "power3.out",
        });
      },
    });

    splitTextIntoSpans(".slider-content-next h1");
    gsap.set(".slider-content-next h1 span", {
      top: isMobile ? "100px" : "175px",
    });

    gsap.to(".slider-content-next", {
      top: "0",
      duration: 1.125,
      ease: "power3.out",
      onComplete: () => {
        document.querySelector(".slider-content-active").remove();
        gsap.to(".slider-content-next h1 span", {
          top: 0,
          stagger: 0.05,
          ease: "power3.out",
          duration: 0.5,
        });

        const nextContent = document.querySelector(".slider-content-next");
        nextContent.classList.remove("slider-content-next");
        nextContent.classList.add("slider-content-active");
        nextContent.style.top = "0";

        currentContentIndex = (currentContentIndex + 1) % sliderContent.length;
        const nextContentText = sliderContent[currentContentIndex];
        const newContentHTML = `<div class="slider-content-next" style="top: 200px;"><h1>${nextContentText}</h1></div>`;
        document
          .querySelector(".slider-content")
          .insertAdjacentHTML("beforeend", newContentHTML);
      },
    });

    currentImageIndex = (currentImageIndex % totalImages) + 1;

    const newSldeHTML = `
    <div class="slide-next">
      <div class="slide-next-img">
        <img src="../images/img${currentImageIndex}.png" alt="Image ${currentImageIndex}">
      </div>
    </div>
    `;

    document
      .querySelector(".slider")
      .insertAdjacentHTML("beforeend", newSldeHTML);

    gsap.to(".slider .slider-next:last-child .slide-next-img", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5,
    });
  });
});
