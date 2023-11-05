import anime from "animejs";

export function transitionInUp(
  elements: NodeListOf<Element> | Element | NodeListOf<Element>[],
  onComplete?: () => void
) {
  anime({
    targets: elements,
    opacity: [0, 1],
    translateY: [100, 0],
    scaleX: [0, 1],
    duration: 500,
    easing: "easeInOutBack",
    loop: false,
    direction: "alternate",
    delay: anime.stagger(50), // increase delay by 100ms for each elements.
    complete: onComplete,
  });
}
