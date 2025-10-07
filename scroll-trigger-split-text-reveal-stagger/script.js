document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const titleHeadings = gsap.utils.toArray(".title h1");
  const titles = gsap.utils.toArray(".title");
  const splits = [];

  titleHeadings.forEach((heading) => {
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

  titles.forEach((title, index) => {
    const titleContainer = title.querySelector(".title-container");
    const titleContainerInitialX = index === 1 ? -100 : 100;
    const split = splits[index];
    const charCount = split.chars.length;

    ScrollTrigger.create({
      trigger: title,
      start: "top bottom",
      end: "top -25%",
      scrub: true,
      markers: true,
      onUpdate: (self) => {
        console.log(self.progress);

        const titltContainerX =
          titleContainerInitialX - self.progress * titleContainerInitialX;
        gsap.set(titleContainer, { x: `${titltContainerX}%` });

        split.chars.forEach((char, i) => {
          let charStaggerIndex;
          if (index === 1) {
            charStaggerIndex = charCount - i - 1;
          } else {
            charStaggerIndex = i;
          }

          const charStartDelay = 0.1;
          const charTimelineSpan = 1 - charStartDelay;
          const staggerFactor = Math.min(0.75, charStaggerIndex * 0.75);
          const delay =
            charStartDelay + (charStaggerIndex / charCount) * staggerFactor;
          const duration =
            charTimelineSpan - (staggerFactor * (charCount - 1)) / charCount;
          const start = delay;

          let charProgess = 0;
          if (self.progress >= start) {
            charProgess = Math.min(1, (self.progress - start) / duration);
          }

          const charInitialY = i % 2 === 0 ? -150 : 150;
          const charY = charInitialY - charProgess * charInitialY;
          gsap.set(char, { y: charY });
        });
      },
    });
  });
});
