import anime from "animejs";

export function transitionInUp(
  elements: NodeListOf<Element> | Element | Array<NodeListOf<Element>>,
  onComplete?: () => void,
) {
  anime({
    targets: elements,
    opacity: [0, 1],
    duration: 500,
    easing: "easeInOutBack",
    loop: false,
    direction: "alternate",
    delay: anime.stagger(50),
    complete: onComplete,
  });
}
