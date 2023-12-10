import anime from "animejs";

export function hover(body: NodeListOf<Element> | Element) {
  // anime({
  //   targets: body,
  //   translateY: [0, 20],
  //   duration: 1000,
  //   easing: "easeInOutSine",
  //   loop: true,
  //   direction: "alternate",
  // });
}

export function shake(body: NodeListOf<Element> | Element) {
  anime({
    targets: body,
    translateX: [0, 5],
    duration: 100,
    easing: "easeInOutSine",
    loop: true,
    direction: "alternate",
  });
}

export function bouncy(body: NodeListOf<Element> | Element) {
  anime({
    targets: body,
    translateY: [0, 15],
    duration: 100,
    easing: "easeInOutSine",
    loop: true,
    direction: "alternate",
  });
}

export function sniffle(body: NodeListOf<Element> | Element) {
  const tl = anime.timeline({
    easing: "easeInOutSine",
    loop: true,
  });
  tl.add({
    targets: body,
    translateY: [0, 15],
    duration: 100,
    easing: "easeInOutSine",
  });
  tl.add({
    targets: body,
    translateY: [15, 0],
    duration: 1000,
    easing: "easeInOutSine",
  });
}
