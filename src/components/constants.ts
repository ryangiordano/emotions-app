import { Emotions } from "./face/constants";

export const emotionBackgroundMap = {
  [Emotions.happy]: "linear-gradient(to bottom, #00e67b, #00b3e6)",
  [Emotions.angry]: "linear-gradient(to bottom, #EB3E3E, #F4D18D)",
  [Emotions.sad]: "linear-gradient(to bottom, #5161E9, #E8CBFF)",
  [Emotions.anxious]: "linear-gradient(to bottom, #F0DD32, #FED992)",
};

export const emotionToTextMap = {
  [Emotions.happy]: "Happy",
  [Emotions.angry]: "Angry",
  [Emotions.sad]: "Sad",
  [Emotions.anxious]: "Anxious",
};
