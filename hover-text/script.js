document.addEventListener("DOMContentLoaded", function () {
  const textContainers = document.querySelectorAll(".text");

  textContainers.forEach((container) => {
    const pElements = container.querySelectorAll("p");
    
    // Set initial position for second paragraph
    if (pElements[1]) {
      gsap.set(pElements[1], { y: "100%" });
    }

    pElements.forEach((p, index) => {
      const text = new SplitText(p, { type: "chars" });
      const chars = text.chars;

      p.addEventListener("mouseenter", () => {
        // Animate current paragraph chars up
        gsap.to(chars, {
          y: "-100%",
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
        });

        // Animate next paragraph in
        if (pElements[index + 1]) {
          gsap.to(pElements[index + 1], {
            y: "0%",
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });

      p.addEventListener("mouseleave", () => {
        // Reset current paragraph
        gsap.to(chars, {
          y: "0%",
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
        });

        // Reset next paragraph
        if (pElements[index + 1]) {
          gsap.to(pElements[index + 1], {
            y: "100%",
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });
    });
  });
});
