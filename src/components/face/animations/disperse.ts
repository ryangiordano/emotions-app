import anime from "animejs";
import { getRandomBetween } from "../../../utils/random";

export default function disperse(element?: HTMLElement) {
  for (let i = 0; i < 15; i++) {
    const fire = document.createElement("div");
    fire.classList.add("small-fire");
    fire.setAttribute(
      "style",
      `
      bottom: ${element?.style.bottom};
      left: ${element?.style.left};
      pointer-events: none;
      `,
    );
    document.body.appendChild(fire);
    anime({
      targets: fire,
      translateX: getRandomBetween(-400, 400),
      translateY: getRandomBetween(-400, 400),
      scale: [1, 0],
      opacity: [1, 0],
      duration: getRandomBetween(1000, 2000),
      easing: "easeOutQuad",
      complete: () => {
        fire.remove();
      },
    });
  }
}
