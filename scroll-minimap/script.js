document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const numberOfImages = 10;
  const minimap = document.querySelector(".minimap");
  const fullSizeContainer = document.querySelector(".images");

  function getRandomLeft() {
    const values = [-15, -7.5, 0, 7.5, 15];
    return values[Math.floor(Math.random() * values.length)] + "px";
  }

  minimap.innerHTML = "";
  fullSizeContainer.innerHTML = "";

  let activeThumbnail = null;

  for (let i = 1; i <= numberOfImages; i++) {
    const index = ((i - 1) % 6) + 1;
    const ranndomLeft = getRandomLeft();

    const imagePath = `../images/img${index}.png`;

    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.classList.add("img-thumbnail");
    thumbnailDiv.style.left = ranndomLeft;

    const imgThumbnail = document.createElement("img");
    imgThumbnail.src = imagePath;
    thumbnailDiv.appendChild(imgThumbnail);
    minimap.appendChild(thumbnailDiv);

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("img");
    imgDiv.style.left = ranndomLeft;
    const imgFull = document.createElement("img");
    imgFull.src = imagePath;
    imgDiv.appendChild(imgFull);
    fullSizeContainer.appendChild(imgDiv);

    ScrollTrigger.create({
      trigger: imgDiv,
      start: "top center",
      end: "bottom center",
      markers: true,
      onToggle: (self) => {
        if (self.isActive) {
          if (activeThumbnail && activeThumbnail !== thumbnailDiv) {
            animateThumbnail(activeThumbnail, false);
          }
          animateThumbnail(thumbnailDiv, true);
          activeThumbnail = thumbnailDiv;
        } else if (activeThumbnail === thumbnailDiv) {
          animateThumbnail(thumbnailDiv, false);
        }
      },
    });
  }

  function animateThumbnail(thumbnail, isActive) {
    gsap.to(thumbnail, {
      border: isActive ? "1px solid #fff" : "none",
      opacity: isActive ? 1 : 0.5,
      scale: isActive ? 1.3 : 1,
      zIndex: isActive ? 10000 : 0,
      duration: 0.3,
    });
  }
});
