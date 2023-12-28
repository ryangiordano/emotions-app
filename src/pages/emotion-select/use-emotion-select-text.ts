import { Emotions } from "../../components/face/constants";

const defaultEmotionText = "Hi, how are you feeling?";

export const emotionSelectText = {
  [Emotions.happy]: "You seem like you're feeling happy! That's wonderful!",
  [Emotions.sad]:
    "Oooh no, you're feeling sad. That's got to be really tough...",
  [Emotions.angry]:
    "You seem like you're feeling REALLY angry. Are you having some big emotions?",
  [Emotions.anxious]: "Oh, are we feeling a little weird and silly? That's ok!",
  [Emotions.neutral]: "",
};

export function getEmotionSelectText({ emotion }: { emotion?: Emotions }) {
  return emotion !== undefined
    ? emotionSelectText[emotion]
    : defaultEmotionText;
}
