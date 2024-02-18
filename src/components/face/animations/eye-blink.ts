import anime from "animejs";

function blinkClose(
  eyes: NodeListOf<Element> | Element,
  timeline: anime.AnimeTimelineInstance,
  endDelay?: number,
) {
  timeline.add({
    targets: eyes,
    scaleY: [1, 0],
    duration: 150,
    easing: "easeInOutSine",
    endDelay,
  });
}

function blinkOpen(
  eyes: NodeListOf<Element> | Element,
  timeline: anime.AnimeTimelineInstance,
  endDelay?: number,
) {
  return timeline.add({
    targets: eyes,
    scaleY: [0, 1],
    duration: 150,
    easing: "easeInOutSine",
    endDelay,
  });
}

export function eyeBlink(eyes: NodeListOf<Element> | Element) {
  const timeline = anime.timeline({
    loop: true,
  });

  blinkClose(eyes, timeline);
  blinkOpen(eyes, timeline, 3000);
  blinkClose(eyes, timeline);
  blinkOpen(eyes, timeline);
  blinkClose(eyes, timeline);
  blinkOpen(eyes, timeline, 3000);
}
