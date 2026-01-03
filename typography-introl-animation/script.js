document.addEventListener("DOMContentLoaded", () => {
  const text = document.querySelectorAll(".text");
  const btn = document.querySelector(".btn");

  btn.addEventListener("click", () => {
    console.log("clicked");
  });
});
