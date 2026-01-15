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

  const leftEye = createEye("#left-eye");
  const rightEye = createEye("#right-eye");

  let requestId = null;

  window.addEventListener("mousemove", onMouseMove);

  function onMouseMove(e) {
    // 1️⃣ Create a screen-space mouse point
    const pt = new DOMPoint(e.clientX, e.clientY);

    // 2️⃣ Convert screen coordinates → SVG coordinates
    const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

    // 3️⃣ Run animation once per frame
    if (!requestId) {
      requestId = requestAnimationFrame(() => {
        leftEye.rotateTo(svgPoint);
        rightEye.rotateTo(svgPoint);
        requestId = null;
      });
    }
  }

  function createEye(selector) {
    const element = document.querySelector(selector);
    const outerCircle = element.querySelector(".eye-outer");
    const innerCircle = element.querySelector(".eye-inner");

    // get eye center in SVG coordinates
    const cx = parseFloat(outerCircle.getAttribute("cx"));
    const cy = parseFloat(outerCircle.getAttribute("cy"));
    const outerRadius = parseFloat(outerCircle.getAttribute("r"));
    const innerRadius = parseFloat(innerCircle.getAttribute("r"));

    // Maximum distance the pupil can move from center
    const maxDistance = outerRadius - innerRadius - 5; // 5px padding

    function rotateTo(point) {
      const dx = point.x - cx;
      const dy = point.y - cy;

      // Calculate distance and angle to mouse
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      // Constrain pupil movement within the eye boundary
      const limitedDistance = Math.min(distance, maxDistance);

      // Calculate new pupil position
      const newX = cx + Math.cos(angle) * limitedDistance;
      const newY = cy + Math.sin(angle) * limitedDistance;

      // Move the inner circle (pupil)
      innerCircle.setAttribute("cx", newX);
      innerCircle.setAttribute("cy", newY);
    }

    return {
      rotateTo,
    };
  }
});
