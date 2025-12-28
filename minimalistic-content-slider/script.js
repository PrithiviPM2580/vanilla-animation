window.addEventListener("DOMContentLoaded", () => {
  const textSlide = document.querySelector(".slide-texts__text");
  const textSlides = textSlide.querySelectorAll(".text");

  const smallImageSlider = document.querySelector(".small-slider__image");
  const bigImageSlider = document.querySelector(".big-slider__image");

  const smallImageSlides = document.querySelectorAll(".small-img");
  const bigImageSlides = document.querySelectorAll(".big-img");

  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let currentIndex = 0;
  const total = textSlides.length; // ✅ FIX 1

  const goToSlide = (index) => {
    currentIndex = (index + total) % total;

    textSlides.forEach((s) => s.classList.remove("slide-texts__text--active"));
    smallImageSlides.forEach((s) => s.classList.remove("small__image--active"));
    bigImageSlides.forEach((s) => s.classList.remove("big__image--active"));

    textSlides[currentIndex].classList.add("slide-texts__text--active");
    smallImageSlides[currentIndex].classList.add("small__image--active");
    bigImageSlides[currentIndex].classList.add("big__image--active");

    textSlide.style.transform = `translateX(-${currentIndex * 100}vw)`;
    smallImageSlider.style.transform = `translateX(-${
      currentIndex * 20
    }vw) scale(0.6)`;
    bigImageSlider.style.transform = `translateX(-${
      currentIndex * 50
    }vw) scale(0.6)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          smallImageSlider.style.transform = `translateX(-${
            currentIndex * 20
          }vw) scale(1)`;
          bigImageSlider.style.transform = `translateX(-${
            currentIndex * 50
          }vw) scale(1)`;
        });
      });
    });
  };

  nextBtn.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
  });

  prevBtn.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
  });
});
