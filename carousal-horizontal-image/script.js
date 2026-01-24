// document.addEventListener("DOMContentLoaded", function () {
//   const carousalItems = document.querySelector(".carousal-items");
//   const activeItem = document.querySelector(".active-item");
//   const activeItemImage = document.createElement("img");

//   activeItem.appendChild(activeItemImage);

//   const fragment = document.createDocumentFragment();

//   for (let i = 1; i <= 100; i++) {
//     const carousalItem = document.createElement("div");
//     carousalItem.classList.add("carousal-item");

//     const index = ((i - 1) % 6) + 1;

//     const img = document.createElement("img");
//     img.src = `../images/img${index}.png`;

//     carousalItem.appendChild(img);
//     fragment.appendChild(carousalItem);
//   }

//   carousalItems.appendChild(fragment);

//   function lerp(start, end, t) {
//     return start * (1 - t) + end * t;
//   }

//   let currentX = 0;
//   let lastScrollY = 0;

//   window.addEventListener("wheel", function (e) {
//     lastScrollY += e.deltaY;
//     const maxScroll = carousalItems.scrollWidth - window.innerWidth;
//     lastScrollY = Math.min(Math.max(0, lastScrollY), maxScroll);
//   });

//   let lastActive = null;
//   let currentLeftMostItem = null;

//   function checkAndUpdateActiveItem() {
//     let allItems = document.querySelectorAll(".carousal-item");
//     for (let item of allItems) {
//       const rect = item.getBoundingClientRect();
//       if (rect.left >= 0 && rect.left < 10) {
//         if (currentLeftMostItem !== item) {
//           if (lastActive) {
//             lastActive.classList.remove("active");
//           }
//           item.classList.add("active");
//           const src = item.querySelector("img").src;
//           activeItemImage.src = src;
//           lastActive = item;
//           currentLeftMostItem = item;
//         }
//         break;
//       }
//     }
//   }

//   function animate() {
//     currentX = lerp(currentX, lastScrollY, 0.1);
//     carousalItems.style.transform = `translateX(${-currentX}px)`;
//     checkAndUpdateActiveItem();
//     requestAnimationFrame(animate);
//   }

//   animate();
// });

document.addEventListener("DOMContentLoaded", function () {
  const carousalItems = document.querySelector(".carousal-items");
  const activeItem = document.querySelector(".active-item");

  // Active image display
  const activeItemImage = document.createElement("img");
  activeItem.appendChild(activeItemImage);

  // Create items using fragment (fast)
  const fragment = document.createDocumentFragment();
  const TOTAL_IMAGES = 6;
  const TOTAL_ITEMS = 100;

  for (let i = 1; i <= TOTAL_ITEMS; i++) {
    const carousalItem = document.createElement("div");
    carousalItem.className = "carousal-item";

    const index = ((i - 1) % TOTAL_IMAGES) + 1;

    const img = document.createElement("img");
    img.src = `../images/img${index}.png`;

    carousalItem.appendChild(img);
    fragment.appendChild(carousalItem);
  }

  carousalItems.appendChild(fragment);

  // Cache items ONCE
  const allItems = Array.from(document.querySelectorAll(".carousal-item"));

  // Measure item width once
  const itemWidth = allItems[0].offsetWidth;

  // Lerp helper
  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  let currentX = 0;
  let targetX = 0;
  let lastActiveIndex = -1;

  // Wheel scroll
  window.addEventListener(
    "wheel",
    (e) => {
      targetX += e.deltaY;

      const maxScroll = carousalItems.scrollWidth - window.innerWidth;

      targetX = Math.max(0, Math.min(targetX, maxScroll));
    },
    { passive: true },
  );

  // Update active item using math (FAST)
  function updateActiveItem() {
    const index = Math.round(currentX / itemWidth);

    if (index !== lastActiveIndex && allItems[index]) {
      if (lastActiveIndex !== -1) {
        allItems[lastActiveIndex].classList.remove("active");
      }

      const item = allItems[index];
      item.classList.add("active");
      activeItemImage.src = item.querySelector("img").src;

      lastActiveIndex = index;
    }
  }

  // Animation loop
  function animate() {
    currentX = lerp(currentX, targetX, 0.1);
    carousalItems.style.transform = `translate3d(${-currentX}px, 0, 0)`;
    updateActiveItem();
    requestAnimationFrame(animate);
  }

  animate();
});
