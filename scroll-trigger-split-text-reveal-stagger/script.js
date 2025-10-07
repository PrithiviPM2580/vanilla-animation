document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const titles = gsap.utils.toArray(".title h1");
  const splits = [];

  titles.forEach((heading) => {
    const splitText = SplitText.create(heading, {
      type: "chars",
      charsClass: "char",
    });
    splits.push(splitText);

    splitText.chars.forEach((split, i) => {
      const charInitialY = i % 2 === 0 ? -150 : 150;
      gsap.set(split, { y: charInitialY });
    });
  });

  console.log(splits);
});
