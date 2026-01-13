const preLoadImages = (selector = "img") => {
  return new Promise((resolve) => {
    imagesLoaded(
      document.querySelectorAll(selector),
      { background: true },
      resolve
    );
  });
};

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin, SplitText);

const smooter = ScrollSmoother.create({
  smooth: 1,
  effects: true,
  normalizeScroll: true,
});

const screenWrepper = document.querySelector(".scene-wrapper");

let isAnimating = false;

const splitMap = new Map();

const getCarouselCellTransforms = (count, radius) => {
  const angleStep = 360 / count;
  return Array.from({ length: count }).map((_, i) => {
    const angle = i * angleStep;
    return `rotateY(${angle}deg) translateZ(${radius}px)`;
  });
};

const setupCarouselCells = (carousel) => {
  const wrapper = carousel.closet(".scene");
  const radius = parseFloat(wrapper.dataset.radius) || 500;
  const cells = carousel.querySelectorAll(".carousel__cell");

  const transforms = getCarouselCellTransforms(cells.length, radius);
  cells.forEach((cell, i) => {
    cell.style.transform = transforms[i];
  });
};

const createScrollAnimation = (carousel) => {
  const wrapper = carousel.closest(".scene");
  const cards = carousel.querySelectorAll(".card");
  const titleSpan = wrapper.querySelector(".scene__title span");
  const split = splitMap.get(titleSpan);
  const chars = split?.chars || [];

  carousel._timeline = gsap.timeline({
    defaults: { ease: "sine.inOut" },
    scrollTrigger: {
      trigger: wrapper,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      markers: true,
    },
  });

  carousel._timeline;
  fromTo(carousel, { rotateY: 0 }, { rotateY: -180 }, 0)
    .fromTo(
      carousel,
      { rotateZ: 3, rotateX: 3 },
      { rotateZ: -3, rotateX: -3 },
      0
    )
    .fromTo(
      cards,
      { filter: "brightness(250%" },
      { filter: "brightness(80%)", ease: "power3" }
    )
    .fromTo(cards, { rotateZ: 10 }, { rotateZ: 0, ease: "none" }, 0);

  if (chars.length > 0) {
    animateChars(chars, "in", {
      scrollTrigger: {
        trigger: wrapper,
        start: "top center",
        toogleActions: "play none none reverse",
      },
    });
  }

  return carousel._timeline;
};

const initTextSplit = () => {
  document
    .querySelectorAll(
      ".scene__title span, .preview__title span, .preview__close"
    )
    .forEach((span) => {
      const split = SplitText.create(span, {
        type: "chars",
        charsClass: "char",
        autoSplit: true,
      });
      splitMap.set(span, split);
    });
};

const getInterpolatedRotation = (progress) => ({
  rotationY: gsap.utils.interpolate(0, -180, progress),
  rotationX: gsap.utils.interpolate(3, -3, progress),
  rotationZ: gsap.utils.interpolate(3, -3, progress),
});

const animategridItemIn = (el, dx, dy, rotationY, delay) => {
  gsap.fromTo(
    el,
    {
      transformOrigin: `% 50% ${dx > 0 ? -dx * 0.8 : dx * 0.8}px`,
      autoAlpha: 0,
      y: dy * 0.5,
      scale: 0.5,
      rotationY: dx < 0 ? rotationY : rotationY,
    },
    {
      y: 0,
      scale: 1,
      rotationY: 0,
      autoAlpha: 1,
      duration: 0.4,
      ease: "sine",
      delay: delay + 0.1,
    }
  );

  gsap.fromTo(
    el,
    { z: -3500 },
    {
      z: 0,
      duration: 0.3,
      ease: "expo",
      delay,
    }
  );
};

const animateGridItemOut = (
  el,
  dx,
  dy,
  rotationY,
  delay,
  isLast,
  onComplete
) => {
  // Animate 2D transform and opacity
  gsap.to(el, {
    startAt: {
      transformOrigin: `50% 50% ${dx > 0 ? -dx * 0.8 : dx * 0.8}px`,
    },
    //x: dx,
    y: dy * 0.4,
    rotationY: dx < 0 ? rotationY : rotationY,
    scale: 0.4,
    autoAlpha: 0,
    duration: 0.4,
    ease: "sine.in",
    delay,
  });
  gsap.to(el, {
    z: -3500,
    duration: 0.4,
    ease: "expo.in",
    delay: delay + 0.9,
    onComplete: isLast ? onComplete : undefined, // Call onComplete only for the last item
  });
};

const animateGridItems = ({
  items,
  centerX,
  centerY,
  direction = "in",
  onComplete,
}) => {
  // Measure position of each item and calculate distance from center
  const itemData = Array.from(items).map((el) => {
    const rect = el.getBoundingClientRect();
    const elCenterX = rect.left + rect.width / 2;
    const elCenterY = rect.top + rect.height / 2;
    const dx = centerX - elCenterX;
    const dy = centerY - elCenterY;
    const dist = Math.hypot(dx, dy); // Euclidean distance from center
    const isLeft = elCenterX < centerX;
    return { el, dx, dy, dist, isLeft };
  });

  const maxDist = Math.max(...itemData.map((d) => d.dist)); // Farthest distance
  const totalStagger = 0.025 * (itemData.length - 1); // Total stagger duration

  let latest = { delay: -1, el: null }; // Track latest delay item

  itemData.forEach(({ el, dx, dy, dist, isLeft }) => {
    const norm = maxDist ? dist / maxDist : 0; // Normalize distance
    const exponential = Math.pow(direction === "in" ? 1 - norm : norm, 1); // Easing
    const delay = exponential * totalStagger;
    const rotationY = isLeft ? 100 : -100; // Directional rotation

    if (direction === "in") {
      animateGridItemIn(el, dx, dy, rotationY, delay);
    } else {
      if (delay > latest.delay) {
        latest = { delay, el };
      }
      animateGridItemOut(el, dx, dy, rotationY, delay, false, onComplete);
    }
  });

  // Ensure onComplete runs only after the last item finishes
  if (direction === "out" && latest.el) {
    const { el, dx, dy, isLeft } = itemData.find((d) => d.el === latest.el);
    const rotationY = isLeft ? 100 : -100;
    animateGridItemOut(el, dx, dy, rotationY, latest.delay, true, onComplete);
  }
};

/**
 * Animates all grid items in the preview into view
 *
 * @param {Element} preview - Preview DOM element containing grid items
 * @returns {void}
 */
const animatePreviewGridIn = (preview) => {
  const items = preview.querySelectorAll(".grid__item");
  // Clear any inline styles from previous animations
  gsap.set(items, { clearProps: "all" });
  // Trigger grid item entrance animation from center of screen
  animateGridItems({
    items,
    centerX: window.innerWidth / 2,
    centerY: window.innerHeight / 2,
    direction: "in",
  });
};

/**
 * Animates all grid items in the preview out of view
 * @param {HTMLElement} preview - The preview container
 */
const animatePreviewGridOut = (preview) => {
  const items = preview.querySelectorAll(".grid__item");
  // Trigger grid item exit animation toward edges
  const onComplete = () =>
    gsap.set(preview, { pointerEvents: "none", autoAlpha: 0 });
  animateGridItems({
    items,
    centerX: window.innerWidth / 2,
    centerY: window.innerHeight / 2,
    direction: "out",
    onComplete,
  });
};

/**
 * Retrieves relevant DOM elements and text splits from a scene title
 * @param {HTMLElement} titleEl - The `.scene__title` element
 * @returns {Object} wrapper, carousel, cards, span, chars
 */
const getSceneElementsFromTitle = (titleEl) => {
  const wrapper = titleEl.closest(".scene"); // Scene container
  const carousel = wrapper?.querySelector(".carousel"); // Carousel in the scene
  const cards = carousel?.querySelectorAll(".card"); // All card elements
  const span = titleEl.querySelector("span"); // Title span
  const chars = splitMap.get(span)?.chars || []; // SplitText chars
  return { wrapper, carousel, cards, span, chars };
};

/**
 * Retrieves scene-related elements from a preview element
 * @param {HTMLElement} previewEl - The `.preview` element
 * @returns {Object} All scene elements and corresponding titleEl
 */
const getSceneElementsFromPreview = (previewEl) => {
  const previewId = `#${previewEl.id}`;
  const titleLink = document.querySelector(
    `.scene__title a[href="${previewId}"]`
  );
  const titleEl = titleLink?.closest(".scene__title"); // Corresponding title element
  return { ...getSceneElementsFromTitle(titleEl), titleEl };
};

/**
 * Animates SplitText character elements in or out
 *
 * @param {HTMLElement[]} chars - Array of character elements to animate
 * @param {'in' | 'out'} direction - Direction of the animation ('in' for fade in, 'out' for fade out)
 * @param {Object} [opts={}] - Optional GSAP config overrides (e.g. scrollTrigger)
 */
const animateChars = (chars, direction = "in", opts = {}) => {
  const base = {
    autoAlpha: direction === "in" ? 1 : 0,
    duration: 0.02,
    ease: "none",
    stagger: { each: 0.04, from: direction === "in" ? "start" : "end" },
    ...opts,
  };

  gsap.fromTo(chars, { autoAlpha: direction === "in" ? 0 : 1 }, base);
};

/**
 * Animates title and close button characters in a preview
 *
 * @param {HTMLElement} preview - The preview container
 * @param {'in' | 'out'} direction - Animation direction
 * @param {string} [selector='.preview__title span, .preview__close'] - Selector for elements to animate
 */
const animatePreviewTexts = (
  preview,
  direction = "in",
  selector = ".preview__title span, .preview__close"
) => {
  preview.querySelectorAll(selector).forEach((el) => {
    const chars = splitMap.get(el)?.chars || [];
    animateChars(chars, direction);
  });
};

/**
 * Handles transition from carousel view to preview grid
 *
 * @param {Event} e - Click event triggered from `.scene__title`
 */
const activatePreviewFromCarousel = (e) => {
  e.preventDefault();
  if (isAnimating) return;
  isAnimating = true;

  const titleEl = e.currentTarget;
  const { wrapper, carousel, cards, chars } =
    getSceneElementsFromTitle(titleEl);

  // Calculate scroll position to center the scene
  const offsetTop = wrapper.getBoundingClientRect().top + window.scrollY;
  const targetY = offsetTop - window.innerHeight / 2 + wrapper.offsetHeight / 2;

  // Temporarily disable scroll-based animations
  ScrollTrigger.getAll().forEach((t) => t.disable(false));

  gsap
    .timeline({
      defaults: { duration: 1.5, ease: "power2.inOut" },
      onComplete: () => {
        isAnimating = false;
        ScrollTrigger.getAll().forEach((t) => t.enable());
        carousel._timeline.scrollTrigger.scroll(targetY);
      },
    })
    .to(window, {
      onStart: () => {
        lockUserScroll();
      },
      onComplete: () => {
        unlockUserScroll();
        smoother.paused(true);
      },
      scrollTo: { y: targetY, autoKill: true },
    })
    .to(
      chars,
      {
        autoAlpha: 0,
        duration: 0.02,
        ease: "none",
        stagger: { each: 0.04, from: "end" },
      },
      0
    )
    .to(carousel, { rotationX: 90, rotationY: -360, z: -2000 }, 0)
    .to(
      carousel,
      {
        duration: 2.5,
        ease: "power3.inOut",
        z: 1500,
        rotationZ: 270,
        onComplete: () => gsap.set(sceneWrapper, { autoAlpha: 0 }),
      },
      0.7
    )
    .to(cards, { rotationZ: 0 }, 0)
    .add(() => {
      const previewSelector = titleEl.querySelector("a")?.getAttribute("href");
      const preview = document.querySelector(previewSelector);
      gsap.set(preview, { pointerEvents: "auto", autoAlpha: 1 });
      animatePreviewGridIn(preview);
      animatePreviewTexts(preview, "in");
    }, "<+=1.9");
};

/**
 * Handles transition from preview grid back to carousel view
 *
 * @param {Event} e - Click event triggered from `.preview__close`
 */
const deactivatePreviewToCarousel = (e) => {
  if (isAnimating) return;
  isAnimating = true;

  const preview = e.currentTarget.closest(".preview");
  if (!preview) return;

  const { carousel, cards, chars } = getSceneElementsFromPreview(preview);

  animatePreviewTexts(preview, "out");
  animatePreviewGridOut(preview);

  gsap.set(sceneWrapper, { autoAlpha: 1 });

  const progress = 0.5; // halfway
  /*
  BUG: progress should always be 0.5 but for some reason it's 0 sometimes
  const timeline = carousel._timeline;
  const scrollTrigger = timeline?.scrollTrigger;
  const progress = scrollTrigger?.progress ?? 0;
  */

  const { rotationX, rotationY, rotationZ } = getInterpolatedRotation(progress);

  gsap
    .timeline({
      delay: 0.7,
      defaults: { duration: 1.3, ease: "expo" },
      onComplete: () => {
        smoother.paused(false);
        isAnimating = false;
      },
    })
    .fromTo(
      chars,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.02,
        ease: "none",
        stagger: { each: 0.04, from: "start" },
      }
    )
    .fromTo(
      carousel,
      {
        z: -550,
        rotationX,
        rotationY: -720,
        rotationZ,
        yPercent: 300,
      },
      {
        rotationY,
        yPercent: 0,
      },
      0
    )
    .fromTo(cards, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.3);
};

/**
 * Adds click event listeners to scene titles and preview close buttons
 *
 * @returns {void}
 */
const initEventListeners = () => {
  // When a scene title is clicked, activate the preview
  document.querySelectorAll(".scene__title").forEach((title) => {
    title.addEventListener("click", activatePreviewFromCarousel);
  });

  // When a preview close button is clicked, deactivate the preview
  document.querySelectorAll(".preview__close").forEach((btn) => {
    btn.addEventListener("click", deactivatePreviewToCarousel);
  });
};

/**
 * Initializes all carousels on the page
 *
 * @returns {void}
 */
const initCarousels = () => {
  document.querySelectorAll(".carousel").forEach((carousel) => {
    setupCarouselCells(carousel); // Position carousel cells in 3D
    carousel._timeline = createScrollAnimation(carousel); // Attach scroll animation timeline
  });
};

function preventScroll(e) {
  e.preventDefault();
}

function lockUserScroll() {
  window.addEventListener("wheel", preventScroll, { passive: false });
  window.addEventListener("touchmove", preventScroll, { passive: false });
  window.addEventListener("keydown", preventArrowScroll, false);
}

function unlockUserScroll() {
  window.removeEventListener("wheel", preventScroll);
  window.removeEventListener("touchmove", preventScroll);
  window.removeEventListener("keydown", preventArrowScroll);
}

function preventArrowScroll(e) {
  const keys = [
    "ArrowUp",
    "ArrowDown",
    "PageUp",
    "PageDown",
    "Home",
    "End",
    " ",
  ];
  if (keys.includes(e.key)) e.preventDefault();
}

/**
 * Initializes text splitting, carousels, and event listeners
 *
 * @returns {void}
 */
const init = () => {
  initTextSplit(); // Prepare character-level splits for animations
  initCarousels(); // Set up carousels with transforms and scroll triggers
  initEventListeners(); // Bind all interactive handlers
  window.addEventListener("resize", ScrollTrigger.refresh); // Refresh triggers on resize
};

// Start app once images are preloaded
preLoadImages(".grid__item-image").then(() => {
  document.body.classList.remove("loading"); // Remove loading state from body
  init(); // Begin initialization
});
