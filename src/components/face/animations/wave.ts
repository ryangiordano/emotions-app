import anime from "animejs";
import { getRandomBetween } from "../../../utils/random";

export default function wave(element?: SVGSVGElement) {
  return new Promise<void>((resolve) => {
    const wave = document.createElement("div");
    wave.classList.add("small-tear");
    wave.setAttribute(
      "style",
      `
    bottom: ${
      element?.style.bottom ??
      0 + (element?.getBoundingClientRect?.()?.height ?? 0)
    };
    left:  ${
      element?.style.left ??
      0 + (element?.getBoundingClientRect?.()?.width ?? 0)
    };
    pointer-events: none;
    `
    );
    document.body.appendChild(wave);
    anime({
      targets: wave,
      scale: [0, 2],
      opacity: [1, 0],
      duration: getRandomBetween(1000, 2000),
      easing: "easeOutQuad",
      complete: () => {
        wave.remove();
        resolve();
      },
    });
  });
}
