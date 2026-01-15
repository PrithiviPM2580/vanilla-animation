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
      el.classList.add("play");
    });
  });
});
