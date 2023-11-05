import anime from "animejs";

export function happyTalk(
  mouth: NodeListOf<Element> | Element,
  duration: number,
  onComplete?: () => void
) {
  if (duration > 0) {
    anime({
      targets: mouth,
      scaleY: [1, 0],
      duration: duration,
      easing: "easeInOutSine",
      loop: true,
      direction: "alternate",
      complete: onComplete,
    });
  }
}
