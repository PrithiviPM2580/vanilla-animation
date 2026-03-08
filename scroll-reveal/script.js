document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const gallery = document.getElementById("gallery");
  const spin = gallery.querySelector("ul");
  const items = spin.children;

  const scrollBar = document.getElementById("scroll");
  const scrollSpace = scrollBar.firstElementChild;
  const dragger = scrollSpace.firstElementChild;

  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  // State
  let distance = 0;
  let offset = 0;
  let current = 0;
  let origin = 0;
  let end = 0;

  let start = {};
  const scroll = 100;
  const angle = 360 / 20;

  let radius;

  // Canvas data
  const dots = 20;
  const data = [];
  const center = {};

  // Utils
  const random = (min, max) => Math.random() * (max - min) + min;

  const convert = (n, z) => n / (z / 2000 + 1);

  const opacity = (i) => 1 - Math.abs((origin - angle * i) / 30);

  const pixels = (value) => (value * scroll) / end;

  const degrees = (value) => (value * end) / scroll;

  const change = (value) => {
    offset = value;
    distance = offset;
    current = origin;
  };

  // Canvas animation
  const drawCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    data.forEach((dot) => {
      const z = dot.r * Math.cos(dot.a);
      const s = convert(1, z);

      const x = center.x + convert(dot.x, z);
      const y = center.y + convert(dot.r * Math.sin(dot.a), z);

      const o = (-z / dot.r) * 0.4;

      ctx.fillStyle = `rgba(255,255,255,${o})`;
      ctx.fillRect(x, y, s, s);

      dot.a += offset / 2000 + 0.002 * (offset < 0 ? -1 : 1);

      if (dot.a > Math.PI * 1.5) dot.a -= Math.PI;
      if (dot.a < Math.PI * 0.5) dot.a += Math.PI;
    });
  };

  // Update gallery
  const updateProjects = () => {
    spin.style.transform = `rotateX(${origin}deg)`;
    dragger.style.transform = `translateY(${(origin * 100) / end}px)`;

    [...items].forEach((item, i) => {
      item.style.opacity = opacity(i);
    });
  };

  const move = () => {
    offset *= 0.96;
    origin = current + distance - offset;
  };

  const animate = () => {
    move();
    updateProjects();
    drawCanvas();
    requestAnimationFrame(animate);
  };

  // Wheel scroll
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

  // Resize
  const resize = () => {
    canvas.width = document.body.offsetWidth;
    canvas.height = document.body.offsetHeight;

    center.x = canvas.width / 2;
    center.y = canvas.height / 2;

    createDots();
  };

  // Create particles
  const createDots = () => {
    data.length = 0;

    const width = canvas.width / 2 / 20;
    const circles = Math.ceil(canvas.width / 2 / width);

    for (let i = 0; i < circles; i++) {
      const x = i * width;
      const r = random(100, 10);

      for (let j = 0; j < dots; j++) {
        data.push({
          x: x,
          r: r,
          a: Math.PI * (j / dots) + Math.PI / 2,
        });

        if (i) {
          data.push({
            x: -x,
            r: r,
            a: Math.PI * (j / dots) + Math.PI / 2,
          });
        }
      }
    }
  };

  // Style 3D gallery
  const style = () => {
    gallery.style.transform = `translateZ(-${radius}px)`;

    [...items].forEach((item, i) => {
      item.style.transform = `rotateX(-${angle * i}deg) translateZ(${radius}px)`;
    });
  };

  // Init values
  const initValues = () => {
    end = angle * (items.length - 1);

    radius = gallery.offsetHeight / 1.7 / Math.tan(Math.PI / 20);
  };

  // Events
  document.addEventListener("wheel", wheel);
  window.addEventListener("resize", resize);

  // Start
  initValues();
  resize();
  style();
  animate();
});
