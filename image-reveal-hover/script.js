document.addEventListener("DOMContentLoaded", function () {
  const projects = document.querySelectorAll(".project");
  const previewImg = document.querySelector(".preview-img");
  const container = document.querySelector(".container");

  container.addEventListener("mousemove", function (e) {
    const x = e.clientX;
    const y = e.clientY;

    previewImg.style.top = y + "px";
    previewImg.style.left = x + "px";
  });

  projects.forEach((project) => {
    project.addEventListener("mouseenter", function () {
      const imgSrc = project.getAttribute("data-img");
      const img = previewImg.querySelector("img");
      if (img) {
        img.src = imgSrc;
      }
      previewImg.classList.add("active");
    });

    project.addEventListener("mouseleave", function () {
      previewImg.classList.remove("active");
    });
  });
});
