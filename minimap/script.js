document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("container");
  const items = document.querySelectorAll(".items");
  const indicator = document.querySelector(".indicator");
  const itemElements = document.querySelectorAll(".item");
  const previewImage = document.querySelector(".img-preview img");
  const itemImages = document.querySelectorAll(".item img");

  let isHorizontal = window.innerWidth <= 900;
  let dimensions = {
    itemSize: 0,
    containerSize: 0,
    indicatorSize: 0,
  };

  let maxTranslate = 0;
  let currentTranslate = 0;
  let targetTranslate = 0;
  let isClickMove = false;
  let currentImageIndex = 0;
  let activeItemOpacity = 0.3;
});
