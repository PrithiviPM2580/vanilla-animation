document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".block");
  const resetDuration = 300;

  //   blocks.forEach((block) => {
  //     let timeoutId;

  //     block.addEventListener("mousemove", () => {
  //       clearTimeout(timeoutId);
  //       block.classList.add("active");
  //       timeoutId = setTimeout(() => {
  //         block.classList.remove("active");
  //       }, resetDuration);
  //     });
  //   });

  document.addEventListener("mousemove", (e) => {
    const block = e.target.closest(".block");
    if (!block) return;

    block.classList.add("active");

    clearTimeout(block._timeout);
    block._timeout = setTimeout(() => {
      block.classList.remove("active");
    }, 300);
  });
});
