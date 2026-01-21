document.addEventListener("DOMContentLoaded", function () {
  const imgNames = document.querySelectorAll(".img-name");
  const imgPreviewContainer = document.querySelector(".img-preview-container");
  const imgViewContainer = document.querySelector(".img-modal .img-view");
  const closeBtn = document.querySelector(".close-btn");
  const modalName = document.querySelector(".modal-name");
  const tl = gsap.timeline({ paused: true });

  imgNames.forEach((imgName) => {
    imgName.addEventListener("mouseenter", () => {
      const dataImg = imgName.getAttribute("data-img");
      imgPreviewContainer.innerHTML = `<img src="../images/img${dataImg}.png" alt="">`;
    });

    imgName.addEventListener("click", () => {
      const dataImg = imgName.getAttribute("data-img");
      imgViewContainer.innerHTML = `<img src="../images/img${dataImg}.png" alt="">`;
      const name = imgName.querySelector(".name").textContent;
      modalName.textContent = name;

      tl.reversed(!tl.reversed());
    });
  });

  closeBtn.onclick = function () {
    tl.reversed(!tl.reversed());
  };

  function revealImg() {
    tl.to(".img-name .name", {
      top: "30px",
      ease: "power4.inOut",
    })
      .to(
        ".img-preview-container",
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
          y: 25,
          ease: "power4.inOut",
        },
        "<",
      )
      .to(".img-modal", {
        opacity: 1,
        ease: "none",
        pointerEvents: "auto",
        duration: 0.005,
        delay: -0.125,
      })
      .to(
        ".img-view",
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          y: 25,
          ease: "power4.inOut",
        },
        "<",
      )
      .to(
        ".close-btn .btn",
        {
          top: 0,
          ease: "power4.inOut",
        },
        "<",
      )
      .to(
        ".modal-name",
        {
          top: 0,
          ease: "power4.inOut",
        },
        "<",
      )
      .reversed();
  }

  revealImg();
});
