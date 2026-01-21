document.addEventListener("DOMContentLoaded", function () {
  const projects = document.querySelectorAll(".project");
  const preview = document.querySelector(".preview");
  const previewImgs = document.querySelectorAll(".preview-img");
  const projectsContainer = document.querySelector(".projects");
  let currentIndex = 0;

  // Initialize image positions
  previewImgs.forEach((img, index) => {
    img.style.transform = `translateY(${index * 100}%)`;
  });

  projectsContainer.addEventListener("mousemove", function (e) {
    const x = e.clientX - preview.offsetWidth / 2;
    const y = e.clientY - preview.offsetHeight / 2;

    preview.style.top = y + "px";
    preview.style.left = x + "px";
  });

  projects.forEach((project, index) => {
    // Skip the header
    if (project.id === "header") return;

    project.addEventListener("mouseenter", function () {
      const projectId = project.id;
      const imgIndex = parseInt(projectId.split("-")[1]) - 1;

      preview.classList.add("show");

      // Remove active from all images
      previewImgs.forEach((img) => img.classList.remove("active"));

      // Calculate offset to center the target image
      previewImgs.forEach((img, i) => {
        const offset = (i - imgIndex) * 100;
        img.style.transform = `translateY(${offset}%)`;
      });

      // Add active to current image
      previewImgs[imgIndex].classList.add("active");
      currentIndex = imgIndex;
    });
  });

  projectsContainer.addEventListener("mouseleave", function () {
    preview.classList.remove("show");
    previewImgs.forEach((img) => img.classList.remove("active"));
  });
});
