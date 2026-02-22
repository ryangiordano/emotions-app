import { Emotions } from "./face/constants";

export const emotionBackgroundMap = {
  [Emotions.happy]: "linear-gradient(to bottom, #00e67b, #00b3e6)",
  [Emotions.angry]: "linear-gradient(to bottom, #EB3E3E, #F4D18D)",
  [Emotions.sad]: "linear-gradient(to bottom, #5161E9, #E8CBFF)",
  [Emotions.anxious]: "linear-gradient(to bottom, #2dfdcd, #fdbb2d)",
  [Emotions.neutral]:
    "linear-gradient(0deg, rgba(201,201,201,1) 0%,  rgba(111,111,111,1) 100%)",
};

export const emotionToTextMap = {
  [Emotions.happy]: "Happy",
  [Emotions.angry]: "Angry",
  [Emotions.sad]: "Sad",
  [Emotions.anxious]: "Anxious",
  [Emotions.neutral]: "Neutral",
};

export const emotionColorMap = {
  [Emotions.happy]: "green",
  [Emotions.angry]: "red",
  [Emotions.sad]: "blue",
  [Emotions.anxious]: "yellow",
  [Emotions.neutral]: "white",
};

export const emotionIconMap = {
  [Emotions.happy]: "😀",
  [Emotions.angry]: "😡",
  [Emotions.sad]: "😢",
  [Emotions.anxious]: "🤪",
};

export enum InputType {
  slider,
  buttons,
}

// Calming background tween constants
export const calmBackground = "linear-gradient(to bottom, #f0f0f0, #ffffff)";

const emotionGradientColors: Record<
  Emotions,
  { start: [number, number, number]; end: [number, number, number] }
> = {
  [Emotions.happy]: { start: [0, 230, 123], end: [0, 179, 230] },
  [Emotions.angry]: { start: [235, 62, 62], end: [244, 209, 141] },
  [Emotions.sad]: { start: [81, 97, 233], end: [232, 203, 255] },
  [Emotions.anxious]: { start: [45, 253, 205], end: [253, 187, 45] },
  [Emotions.neutral]: { start: [111, 111, 111], end: [201, 201, 201] },
};

const calmTarget = { start: [240, 240, 240] as const, end: [255, 255, 255] as const };

function lerpChannel(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

export function getCalmingBackground(emotion: Emotions, progress: number): string {
  const colors = emotionGradientColors[emotion];
  const t = Math.min(Math.max(progress, 0), 1);
  const r1 = lerpChannel(colors.start[0], calmTarget.start[0], t);
  const g1 = lerpChannel(colors.start[1], calmTarget.start[1], t);
  const b1 = lerpChannel(colors.start[2], calmTarget.start[2], t);
  const r2 = lerpChannel(colors.end[0], calmTarget.end[0], t);
  const g2 = lerpChannel(colors.end[1], calmTarget.end[1], t);
  const b2 = lerpChannel(colors.end[2], calmTarget.end[2], t);
  return `linear-gradient(to bottom, rgb(${r1},${g1},${b1}), rgb(${r2},${g2},${b2}))`;
}
