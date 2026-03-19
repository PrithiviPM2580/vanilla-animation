document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Smooth scroll setup
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  const TOTAL_IMAGES = 10;
  const IMAGE_VARIANTS = 6;

  const minimap = document.querySelector(".minimap");
  const fullSizeContainer = document.querySelector(".images");

  // ✅ Clear old DOM (important)
  minimap.innerHTML = "";
  fullSizeContainer.innerHTML = "";

  const offsets = [-15, -7.5, 0, 7.5, 15];

  let activeThumbnail = null;

  // Helper functions
  const getRandomOffset = () =>
    offsets[Math.floor(Math.random() * offsets.length)];

  const getImageIndex = (i) => ((i - 1) % IMAGE_VARIANTS) + 1;

  const createImageElement = (src, className, offset) => {
    const wrapper = document.createElement("div");
    wrapper.className = className;
    wrapper.style.left = `${offset}px`;

    const img = document.createElement("img");
    img.src = src;

    wrapper.appendChild(img);
    return wrapper;
  };

  const animateThumbnail = (el, active) => {
    gsap.to(el, {
      border: active ? "1px solid #fff" : "none",
      opacity: active ? 1 : 0.5,
      scale: active ? 1.3 : 1,
      zIndex: active ? 10 : 0,
      duration: 0.3,
    });
  };

  // Use fragment for performance
  const miniFragment = document.createDocumentFragment();
  const fullFragment = document.createDocumentFragment();

  for (let i = 1; i <= TOTAL_IMAGES; i++) {
    const index = getImageIndex(i);
    const offset = getRandomOffset();
    const src = `../images/img${index}.png`;

    const thumbnail = createImageElement(src, "img-thumbnail", offset);
    const fullImage = createImageElement(src, "img", offset);

    miniFragment.appendChild(thumbnail);
    fullFragment.appendChild(fullImage);

    ScrollTrigger.create({
      trigger: fullImage,
      start: "top center",
      end: "bottom center",
      markers: true,
      onToggle: ({ isActive }) => {
        console.log(isActive);
        if (isActive) {
          if (activeThumbnail && activeThumbnail !== thumbnail) {
            animateThumbnail(activeThumbnail, false);
          }
          animateThumbnail(thumbnail, true);
          activeThumbnail = thumbnail;
          console.log("Active thumbnail:", thumbnail);
        } else if (activeThumbnail === thumbnail) {
          animateThumbnail(thumbnail, false);
        }
      },
    });
  }

  minimap.appendChild(miniFragment);
  fullSizeContainer.appendChild(fullFragment);
});
