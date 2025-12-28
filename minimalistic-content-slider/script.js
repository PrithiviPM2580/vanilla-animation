window.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slide-texts__text");
  const slides = slider.querySelectorAll(".slide-texts__text .text");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let currentIndex = 0;

  const goToSlide = (index) => {
    const total = slides.length;
    // wrap around using modulo so the slider loops
    currentIndex = (index + total) % total;

    slides.forEach((s) => s.classList.remove("active"));
    slides[currentIndex].classList.add("active");

    slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
  };

  nextBtn.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
  });

  prevBtn.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
  });
});
