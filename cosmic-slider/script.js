document.addEventListener("DOMContentLoaded", function () {
  const cosmos = document.querySelectorAll(".cosmos");
  const total = cosmos.length;
  const conatiner = document.querySelector(".container");

  for (let i = 0; i < total; i++) {
    let angle = (360 / total) * i;
    let transform = `rotate(${angle}deg) translate(50vh)`;
    cosmos[i].style.transform = transform;
    let cosmosItems = cosmos[i].querySelectorAll(".cosmos-item");

    for (let j = 0; j < cosmosItems.length; j++) {
      cosmosItems[j].style.animationDelay = `${j * 0.5}s`;
    }
  }
});
