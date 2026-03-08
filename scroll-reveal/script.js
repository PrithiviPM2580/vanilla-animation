document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector("#gallery");
  const spin = document.querySelector("ul");
  const items = spin.children;

  const scrollBar = document.querySelector("#scroll");
  const scrollSpace = scrollBar.firstElementChild;
  const dragger = scrollSpace.firstElementChild;

  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  //State
  let distance = 0;
  let offset = 0;
  let origin = 0;
  let current = 0;
  let end = 0;

  let radius;
  const angle = 360 / 20;

  const opacity = (i) => 1 - Math.abs((origin - angle * i) / 30);

  const updateProjects = () => {
    spin.style.transform = `rotateX(${origin}deg)`;
    dragger.style.transform = `translateY(${(origin * 100) / end}px)`;

    [...items].forEach((item, i) => {
      item.style.opacity = opacity(i);
    });
  };

  const style = () => {
    gallery.style.transform = `translateZ(-${radius}px)`;

    [...items].forEach((item, i) => {
      item.style.transform = `rotateY(${angle * i}deg) translateZ(${radius}px)`;
    });
  };

  const initValues = () => {
    end = angle * (items.length - 1);

    radius = gallery.offsetHeight / 1.7 / Math.tan(Math.PI / 20);
  };

  const move = () => {
    offset *= 0.96;
    origin = current + distance - offset;
  };

  const animate = () => {
    move();
    updateProjects();
    requestAnimationFrame(animate);
  };

  const wheel = (event) => {
    const direction = event.deltaY > 0 ? 1 : -1;
    const step = angle / 2;

    if (origin > end - step && direction > 0) distance = end - origin;
    else if (origin < step && direction < 0) distance = origin * direction;
    else distance = step * direction;

    offset = distance;
    current = origin;

    event.preventDefault();
  };

  document.addEventListener("wheel", wheel);

  initValues();
  style();
  animate();
});
