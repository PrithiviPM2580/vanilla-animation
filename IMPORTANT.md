
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Infinite Slider</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        overflow: hidden;
        font-family: Arial, sans-serif;
      }

      .slider {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: relative;
      }

      .slides {
        display: flex;
        height: 100%;
        transition: transform 0.6s ease-in-out;
      }

      .slide {
        min-width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
        color: white;
      }

      .slide1 {
        background: #ff7675;
      }
      .slide2 {
        background: #74b9ff;
      }
      .slide3 {
        background: #55efc4;
      }

      button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: 12px 20px;
        font-size: 18px;
        cursor: pointer;
        z-index: 10;
      }

      #prev {
        left: 20px;
      }
      #next {
        right: 20px;
      }
    </style>
  </head>
  <body>
    <div class="slider">
      <div class="slides">
        <!-- clone last -->
        <div class="slide slide3">Slide 3</div>

        <div class="slide slide1">Slide 1</div>
        <div class="slide slide2">Slide 2</div>
        <div class="slide slide3">Slide 3</div>

        <!-- clone first -->
        <div class="slide slide1">Slide 1</div>
      </div>

      <button id="prev">⟵</button>
      <button id="next">⟶</button>
    </div>

    <script>
      const slides = document.querySelector(".slides");
      const slideElements = document.querySelectorAll(".slide");
      const prev = document.getElementById("prev");
      const next = document.getElementById("next");

      const total = slideElements.length;
      let index = 1;

      slides.style.transform = `translateX(-${index * 100}vw)`;

      next.addEventListener("click", () => {
        if (index >= total - 1) return;
        index++;
        slides.style.transition = "transform 0.6s ease-in-out";
        slides.style.transform = `translateX(-${index * 100}vw)`;
        console.log(index);
      });

      prev.addEventListener("click", () => {
        if (index <= 0) return;
        index--;
        slides.style.transition = "transform 0.6s ease-in-out";
        slides.style.transform = `translateX(-${index * 100}vw)`;
        console.log(index);
      });

      slides.addEventListener("transitionend", () => {
        // If we hit cloned slides, jump instantly
        if (
          slideElements[index].textContent === "Slide 1" &&
          index === total - 1
        ) {
          slides.style.transition = "none";
          index = 1;
          slides.style.transform = `translateX(-${index * 100}vw)`;
          console.log("Jumped to first real slide", index);
        }

        if (slideElements[index].textContent === "Slide 3" && index === 0) {
          slides.style.transition = "none";
          index = total - 2;
          slides.style.transform = `translateX(-${index * 100}vw)`;
          console.log("Jumped to last real slide", index);
        }
      });
    </script>
  </body>
</html>
```