document.addEventListener("DOMContentLoaded", function () {
  const items = [
    { title: "Echoes of Silence", tag: ["mix"], img: "../images/img1.png" },
    { title: "Neon Tide Rework", tag: ["mix"], img: "../images/img2.png" },
    { title: "Afterglow Flip", tag: ["mix"], img: "../images/img3.png" },
    { title: "Velvet Pulse Mix", tag: ["mix"], img: "../images/img4.png" },
    { title: "Skyline Dub", tag: ["mix"], img: "../images/img5.png" },
    { title: "Night Train Remix", tag: ["mix"], img: "../images/img6.png" },
    { title: "Lunar Drift Edit", tag: ["mix"], img: "../images/img1.png" },
    { title: "Mirage Club Version", tag: ["mix"], img: "../images/img2.png" },
    { title: "Heatwave Retouch", tag: ["mix"], img: "../images/img3.png" },
    { title: "Midnight Echo Mix", tag: ["mix"], img: "../images/img4.png" },
    {
      title: "Ambient Texture Lab",
      tag: ["design"],
      img: "../images/img5.png",
    },
    {
      title: "Cinematic Wind Layers",
      tag: ["design"],
      img: "../images/img6.png",
    },
    { title: "Granular Dustscape", tag: ["design"], img: "../images/img1.png" },
    { title: "Metallic Space FX", tag: ["design"], img: "../images/img2.png" },
    {
      title: "Oceanic Drone Craft",
      tag: ["design"],
      img: "../images/img3.png",
    },
    { title: "Analog Noise Study", tag: ["design"], img: "../images/img4.png" },
    { title: "Pulse Impact Pack", tag: ["design"], img: "../images/img5.png" },
    {
      title: "Dream Foley Collection",
      tag: ["design"],
      img: "../images/img6.png",
    },
    {
      title: "Reverse Atmos Session",
      tag: ["design"],
      img: "../images/img1.png",
    },
    {
      title: "Subharmonic Color Set",
      tag: ["design"],
      img: "../images/img2.png",
    },
    {
      title: "City Lights Production",
      tag: ["music"],
      img: "../images/img3.png",
    },
    {
      title: "Broken Rhythm Session",
      tag: ["music"],
      img: "../images/img4.png",
    },
    { title: "Aurora Beat Tape", tag: ["music"], img: "../images/img5.png" },
    {
      title: "Parallel Chord Project",
      tag: ["music"],
      img: "../images/img6.png",
    },
    { title: "Deep Orbit Grooves", tag: ["music"], img: "../images/img1.png" },
    { title: "Sunset Bassline", tag: ["music"], img: "../images/img2.png" },
    { title: "Crystal Synth Flow", tag: ["music"], img: "../images/img3.png" },
    { title: "Nocturne Drum Stack", tag: ["music"], img: "../images/img4.png" },
    {
      title: "Static Horizon Track",
      tag: ["music"],
      img: "../images/img5.png",
    },
    { title: "Motion House Draft", tag: ["music"], img: "../images/img6.png" },
  ];

  const itemsContainer = document.querySelector(".items");
  const itemsCols = document.querySelectorAll(".item-col");
  const filters = document.querySelectorAll(".filter");
  const isMobile = window.innerWidth <= 900;
  const defaultFontSize = isMobile ? "45px" : "75px";
  const activeFontSize = isMobile ? "100px" : "250px";

  function splitTextIntoSpans(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      const text = el.innerText;
      el.innerHTML = text
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("");
    });
  }

  function animateFontSize(target, fontSize) {
    const spans = target.querySelectorAll("span");
    gsap.to(spans, {
      fontSize: fontSize,
      stagger: 0.025,
      ease: "power2.out",
      duration: 0.5,
    });
  }

  function clearItems() {
    itemsCols.forEach((col) => {
      col.innerHTML = "";
    });
  }

  function addItemsToCols(filter = "all") {
    let colIndex = 0;
    const filteredItems = items.filter(
      (item) => filter === "all" || item.tag.includes(filter),
    );

    filteredItems.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item");
      itemElement.innerHTML = `
         <div class="item-img">
            <img src="${item.img}" alt="${item.title}">
         </div>
         <div class="item-copy"><p>${item.title}</p></div>
        `;
      itemsCols[colIndex % itemsCols.length].appendChild(itemElement);
      colIndex++;
    });
  }

  function animateItems(filter) {
    gsap.to(itemsContainer, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        clearItems();
        addItemsToCols(filter);
        gsap.to(itemsContainer, {
          opacity: 1,
          duration: 0.25,
        });
      },
    });
  }

  splitTextIntoSpans(".filter h1");
  animateFontSize(document.querySelector(".filter.active h1"), activeFontSize);
  addItemsToCols();

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      if (filter.classList.contains("active")) return;

      const previousActiveFilterH1 =
        document.querySelector(".filter.active h1");
      animateFontSize(previousActiveFilterH1, defaultFontSize);

      filters.forEach((f) => f.classList.remove("active"));
      filter.classList.add("active");
      const filterH1 = filter.querySelector("h1");
      animateFontSize(filterH1, activeFontSize);
      const filterValue = filter.getAttribute("data-filter");
      animateItems(filterValue);
    });
  });
});
