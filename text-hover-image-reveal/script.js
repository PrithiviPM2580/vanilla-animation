document.addEventListener("DOMContentLoaded", () => {
  const textImages = gsap.utils.toArray(".text-img");
  const wrapper = document.querySelector(".wrapper");
  const imgElement = document.querySelector(".img");
  const imgContainer = document.querySelector(".img img");

  // create quickTo ONCE
  const moveX = gsap.quickTo(imgElement, "x", {
    duration: 0.4,
    ease: "power3.out",
  });

  const moveY = gsap.quickTo(imgElement, "y", {
    duration: 0.4,
    ease: "power3.out",
  });

  textImages.forEach((img) => {
    img.addEventListener("mouseenter", hoverImage);
    img.addEventListener("mouseleave", hoverImage);
    img.addEventListener("mousemove", moveImage);
  });

  function hoverImage(e) {
    const imgSrc = e.currentTarget.getAttribute("data-img");
    imgContainer.src = imgSrc;

    if (e.type === "mouseenter") {
      gsap.to(imgContainer, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(imgContainer, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }

  function moveImage(e) {
    const bounds = wrapper.getBoundingClientRect();
    const offsetX = imgElement.offsetWidth / 2;
    const offsetY = imgElement.offsetHeight / 2;

    moveX(e.clientX - bounds.left - offsetX);
    moveY(e.clientY - bounds.top - offsetY);
  }
});
