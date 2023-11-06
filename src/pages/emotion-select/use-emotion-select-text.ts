import { Emotions } from "../../components/face/constants";

const defaultEmotionText = "Hi Aris, how are you feeling?";

export const emotionSelectText = {
  [Emotions.happy]: "You seem like you're feeling happy!",
  [Emotions.sad]: "Oooh, I'm sorry you're feeling sad.",
  [Emotions.angry]: "You seem like you're feeling REALLY angry.",
  [Emotions.anxious]: "Oh, are we feeling a little weird?",
};

export function getEmotionSelectText({ emotion }: { emotion?: Emotions }) {
  return emotion !== undefined
    ? emotionSelectText[emotion]
    : defaultEmotionText;
}
