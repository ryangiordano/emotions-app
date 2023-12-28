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
