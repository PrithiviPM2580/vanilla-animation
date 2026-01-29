document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".item");

  items.forEach((item) => {
    const img = item.querySelector(".item-img");
    gsap.set(img, { scale: 0 });
  });

  function setScale() {
    items.forEach((item) => {
      const img = item.querySelector(".item-img");
      const rect = item.getBoundingClientRect();

      const viewportHeight = window.innerHeight;
      const itemCenter = rect.top + rect.height / 2;

      const distanceGromCenter = Math.abs(viewportHeight / 2 - itemCenter);
      const progress = distanceGromCenter / (viewportHeight / 2);

      const adjustProgress = Math.pow(progress, 2);

      let scale = 1 - adjustProgress * 0.5;
      scale = Math.max(0, Math.min(scale, 1));

      gsap.to(img, { scale: scale, duration: 1 });
    });

    setScale();

    window.addEventListener("scroll", setScale);

    let scrollY = 0;
    let oldScrollY = 0;
    let roundedScrollY = 0;
    let lerpAmount = 0.1;

    function lerp(start, end, amt) {
      return (1 - amt) * start + amt * end;
    }

    function animate() {
      requestAnimationFrame(animate);

      roundedScrollY = lerp(roundedScrollY, scrollY, lerpAmount);

      document.querySelector(".container").style.transform =
        `translate3d(0, -${roundedScrollY}px, 0)`;

      setScale();
    }

    window.addEventListener("scroll", function (e) {
      scrollY = window.scrollY;
    });

    animate();
  }
});
