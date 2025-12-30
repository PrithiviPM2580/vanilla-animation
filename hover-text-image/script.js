document.addEventListener("DOMContentLoaded", function () {
  const img = document.querySelector("img");
  const projects = document.querySelectorAll(".project");
  const imageContainer = document.querySelector(".img");

  projects.forEach((project, index) => {
    project.addEventListener("mouseenter", (e) => {
      const imgSrc = project.getAttribute("data-img");
      img.src = imgSrc;
      imageContainer.classList.add("show");
    });

    project.addEventListener("mouseleave", () => {
      imageContainer.classList.remove("show");
    });
  });
});
