document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".img, .text");

  const observer = new IntersectionObserver(
    (enteries) => {
      enteries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          console.log("It Reveals");
        } else {
          entry.target.classList.remove("reveal");
          console.log("It Hides");
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  elements.forEach((el) => observer.observe(el));
  //   function checkScroll() {
  //     const scrollPosition = window.scrollY;
  //     const windowHeight = window.innerHeight;

  //     elements.forEach((el) => {
  //       const elementTop = el.getBoundingClientRect().top + scrollPosition;
  //       const revealPoint = scrollPosition + windowHeight - 300;

  //       if (revealPoint > elementTop) {
  //         console.log("It Reveals");
  //         el.classList.add("reveal");
  //       } else {
  //         el.classList.remove("reveal");
  //         console.log("It Hides");
  //       }
  //     });
  //   }

  //   window.addEventListener("scroll", checkScroll);
  //   checkScroll();
});
