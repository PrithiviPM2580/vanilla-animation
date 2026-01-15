document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".text");

  elements.forEach((el) => {
    let innerText = el.innerText;
    el.innerHTML = "";

    let textContainer = document.createElement("div");
    textContainer.classList.add("block");

    for (let letter of innerText) {
      let span = document.createElement("span");
      span.innerText = letter.trim() === "" ? "\xa0" : letter;
      span.classList.add("letter");
      textContainer.appendChild(span);
    }

    el.appendChild(textContainer);
    el.appendChild(textContainer.cloneNode(true));
  });

  elements.forEach((el) => {
    el.addEventListener("mouseover", (e) => {
      el.classList.remove("play");
    });
  });

  const svg = document.querySelector("#svg");
  const mouse = svg.createSVGPoint();

  const leftEye = createEye("#left-eye");
  const rightEye = createEye("#right-eye");

  let requestId = null;

  window.addEventListener("mousemove", onMouseMove);

  function onFrame() {
    let point = mouse.matrixTransform(svg.getScreenCTM().inverse());

    leftEye.rotateTo(point);
    rightEye.rotateTo(point);

    requestId = null;
  }

  function onMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if (!requestId) {
      requestId = requestAnimationFrame(onFrame);
    }
  }

  function createEye(selector) {
    const element = document.querySelector(selector);

    element.style.transformOrigin = "center";

    let box = element.getBBox();
    let cx = box.x + box.width / 2;
    let cy = box.y + box.height / 2;

    function rotateTo(point) {
      let dx = point.x - cx;
      let dy = point.y - cy;
      let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      element.style.transform = `rotate(${angle}deg)`;
    }

    return {
      element,
      rotateTo,
    };
  }
});
