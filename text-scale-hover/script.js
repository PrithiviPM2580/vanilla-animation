document.addEventListener("DOMContentLoaded", () => {
  const words = document.querySelectorAll(".word");

  const defaultScale = 1;
  const maxScale = 1.6;
  const neighborScale = 1.3;

  words.forEach((container) => {
    const spans = Array.from(container.querySelectorAll("span"));

    // assign index ONCE
    spans.forEach((span, i) => {
      span.dataset.index = i;
      span.style.transform = `scaleY(${defaultScale})`;
    });

    let prevIndex = null;

    container.addEventListener("mousemove", (e) => {
      const span = e.target.closest("span");
      if (!span || !container.contains(span)) return;

      const index = Number(span.dataset.index);
      if (index === prevIndex) return;

      // reset previous
      if (prevIndex !== null) {
        spans[prevIndex].style.transform = `scaleY(${defaultScale})`;
        if (spans[prevIndex - 1]) {
          spans[prevIndex - 1].style.transform = `scaleY(${defaultScale})`;
        }
        if (spans[prevIndex + 1]) {
          spans[prevIndex + 1].style.transform = `scaleY(${defaultScale})`;
        }
      }

      // set new
      spans[index].style.transform = `scaleY(${maxScale})`;
      if (spans[index - 1]) {
        spans[index - 1].style.transform = `scaleY(${neighborScale})`;
      }
      if (spans[index + 1]) {
        spans[index + 1].style.transform = `scaleY(${neighborScale})`;
      }

      prevIndex = index;
    });

    container.addEventListener("mouseleave", () => {
      spans.forEach((span) => {
        span.style.transform = `scaleY(${defaultScale})`;
      });
      prevIndex = null;
    });
  });
});
