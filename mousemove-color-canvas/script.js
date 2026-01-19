document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("draw");
  const ctx = canvas.getContext("2d");

  // Resize canvas to fill browser window dynamically
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas, false);
  resizeCanvas();

  ctx.strokeStyle = "#bada55";
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 100;

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let direction = true;

  function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    [lastX, lastY] = [e.clientX, e.clientY];

    hue++;
    if (hue >= 360) {
      hue = 0;
    }
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.clientX, e.clientY];
  });

  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener(
    "mouseup",
    () => ((isDrawing = false), clearCanvas()),
  );
  canvas.addEventListener(
    "mouseout",
    () => ((isDrawing = false), clearCanvas()),
  );
});
