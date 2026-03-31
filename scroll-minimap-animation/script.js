document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  const imagesContainer = document.querySelector(".images");
  const preview = document.querySelector(".preview");
  const minimap = document.querySelector(".minimap");

  function getElementTop(element) {
    let top = 0;
    while (element) {
      top += element.offsetTop;
      element = element.offsetParent;
    }
    return top;
  }

  const imagesStart = getElementTop(imagesContainer);
  const imagesEnd = imagesStart + imagesContainer.offsetHeight;
  const viewportHeight = window.innerHeight;
  const previewHeight = preview.offsetHeight;
  const previewMaxTraslate = (minimap.offsetHeight - previewHeight) * 2.84;

  function handleScroll() {
    const scrollPosition = window.scrollY;
    const scrollRange = imagesEnd - imagesStart - viewportHeight;
    const previewScrollRange = Math.min(previewMaxTraslate, scrollRange);

    if (
      scrollPosition >= imagesStart &&
      scrollPosition <= imagesEnd - viewportHeight
    ) {
      let scrollFraction = (scrollPosition - imagesStart) / scrollRange;
      let previewTranslateY = scrollFraction * previewScrollRange;
      preview.style.transform = `translateX(-50%) translateY(${previewTranslateY}px)`;
    } else if (scrollPosition < imagesStart) {
      preview.style.transform = `translateX(-50%) translateY(0%)`;
    } else {
      preview.style.transform = `translateX(-50%) translateY(${previewMaxTraslate}px)`;
    }
  }

  window.addEventListener("scroll", handleScroll);

  const tooglePoint = window.innerHeight * 4;
  const wrapper = document.querySelector(".wrapper");

  function checkScroll() {
    if (window.scrollY >= tooglePoint) {
      wrapper.classList.add("light-theme");
    } else {
      wrapper.classList.remove("light-theme");
    }
  }

  window.addEventListener("scroll", checkScroll);
});
