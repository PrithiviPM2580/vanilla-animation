document.addEventListener("DOMContentLoaded", function () {
  const tl = gsap.timeline({ paused: true });

  function revealMenu() {
    revealmenuitems();

    const toogleBtn = document.getElementById("menu-toggle");
    const closeBtn = document.getElementById("menu-close");

    toogleBtn.onclick = function (e) {
      tl.reversed(!tl.reversed());
    };

    closeBtn.onclick = function (e) {
      tl.reversed(!tl.reversed());
    };
  }

  revealMenu();

  function revealmenuitems() {
    tl.to(".menu-container", {
      height: "210px",
      duration: 0.01,
    })
      .to(".col1", {
        left: "-200px",
        ease: "power4.inOut",
      })
      .to(
        ".col2",
        {
          left: "0px",
          ease: "power4.inOut",
        },
        "<",
      )
      .to(
        ".col2 > .menu-item",
        {
          left: 0,
          ease: "power4.inOut",
          stagger: {
            amount: 0.25,
          },
        },
        "<",
      )
      .reverse();
  }

  gsap.to(".marquee", {
    x: "-250%",
    duration: 10,
    ease: "none",
    repeat: -1,
    yoyo: true,
  });

  let menuContainer = document.querySelector(".menu-container");
  let marqueeContainer = document.querySelector(".marquee-container");
  let isInisideMenuContainer = false;

  menuContainer.addEventListener("mouseenter", () => {
    isInisideMenuContainer = true;
    marqueeContainer.style.display = "block";
  });

  menuContainer.addEventListener("mousemove", (e) => {
    if (isInisideMenuContainer) {
      marqueeContainer.style.display = "block";
      let pageXOffset =
        window.pageXOffset || document.documentElement.scrollLeft;
      let pageYOffset =
        window.pageYOffset || document.documentElement.scrollTop;
      let cursorX = e.clientX + pageXOffset;
      let cursorY = e.clientY + pageYOffset;
      let containerX = cursorX - marqueeContainer.offsetWidth / 2;
      let containerY = cursorY - marqueeContainer.offsetHeight / 2;

      gsap.to(marqueeContainer, {
        scale: 1,
        left: containerX + 25,
        top: containerY,
        duration: 1,
        ease: "power3.out",
      });
    }
  });

  menuContainer.addEventListener("mouseleave", () => {
    isInisideMenuContainer = false;
    gsap.to(marqueeContainer, {
      scale: 0,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        marqueeContainer.style.display = "none";
      },
    });
  });
});
