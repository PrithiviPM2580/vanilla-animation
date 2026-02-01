const items = [
  {
    img: "../images/img1.png",
    parallexSpeed: 0.04,
  },
  {
    img: "../images/img2.png",
    parallexSpeed: 0.03,
  },
  {
    img: "../images/img3.png",
    parallexSpeed: 0.06,
  },
  {
    img: "../images/img4.png",
    parallexSpeed: 0.08,
  },
  {
    img: "../images/img5.png",
    parallexSpeed: 0.1,
  },
  {
    img: "../images/img6.png",
    parallexSpeed: 0.05,
  },
  {
    img: "../images/img1.png",
    parallexSpeed: 0.04,
  },
  {
    img: "../images/img2.png",
    parallexSpeed: 0.03,
  },
  {
    img: "../images/img3.png",
    parallexSpeed: 0.06,
  },
  {
    img: "../images/img4.png",
    parallexSpeed: 0.08,
  },
];

const positions = [
  {
    top: "8%",
    left: "10%",
  },
  {
    top: "32%",
    left: "5%",
  },
  {
    top: "55%",
    left: "20%",
  },
  {
    top: "72%",
    left: "15%",
  },
  {
    top: "88%",
    left: "42%",
  },
  {
    top: "18%",
    left: "58%",
  },
  {
    top: "42%",
    left: "75%",
  },
  {
    top: "65%",
    left: "82%",
  },
  {
    top: "78%",
    left: "62%",
  },
  {
    top: "92%",
    left: "90%",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");

  items.forEach((itemData, index) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.style.top = positions[index].top;
    item.style.left = positions[index].left;
    item.style.setProperty("--parallex-speed", itemData.parallexSpeed);

    const img = document.createElement("img");
    img.src = itemData.img;

    item.appendChild(img);
    gallery.appendChild(item);
  });

  const moveX = gsap.quickTo(".item", "x", { duration: 0.5, ease: "sine" });
  const moveY = gsap.quickTo(".item", "y", { duration: 0.5, ease: "sine" });

  document.addEventListener("mousemove", (e) => {
    gallery.querySelectorAll(".item").forEach((item, index) => {
      const animationSpeed = items[index].parallexSpeed;
      const x = (e.clientX - window.innerWidth / 2) * animationSpeed;
      const y = (e.clientY - window.innerHeight / 2) * animationSpeed;
      moveX(x);
      moveY(y);
    });
  });
});
