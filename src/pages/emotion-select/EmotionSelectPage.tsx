import { useState } from "react";
import DialogBox from "../../components/dialog-box/DialogBox";
import EmotionContainer from "../../components/emotion-container/EmotionContainer";
import Face from "../../components/face/Face";
import FaceContainer from "../../components/face/FaceContainer";
import { Emotions } from "../../components/face/constants";
import ButtonContainer from "./ButtonContainer";
import EmotionSelectButton from "./EmotionSelectButton";

export default function EmotionSelectPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotions>(
    Emotions.happy
  );
  return (
    <EmotionContainer emotion={selectedEmotion}>
      <DialogBox text={"Hi Aris, how are you feeling today?"} />

      <FaceContainer>
        <Face emotion={selectedEmotion} />
      </FaceContainer>

      <ButtonContainer>
        <EmotionSelectButton
          onClick={() => {
            setSelectedEmotion(Emotions.happy);
          }}
          className="green"
          selected={selectedEmotion === Emotions.happy}
        >
          😀
        </EmotionSelectButton>
        <EmotionSelectButton
          onClick={() => {
            setSelectedEmotion(Emotions.angry);
          }}
          className="red"
          selected={selectedEmotion === Emotions.angry}
        >
          😡
        </EmotionSelectButton>
        <EmotionSelectButton
          onClick={() => {
            setSelectedEmotion(Emotions.sad);
          }}
          className="blue"
          selected={selectedEmotion === Emotions.sad}
        >
          😢
        </EmotionSelectButton>
        <EmotionSelectButton
          onClick={() => {
            setSelectedEmotion(Emotions.anxious);
          }}
          className="yellow"
          selected={selectedEmotion === Emotions.anxious}
        >
          🤪
        </EmotionSelectButton>
      </ButtonContainer>
    </EmotionContainer>
  );
}
