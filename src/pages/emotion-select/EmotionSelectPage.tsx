import { useCallback, useState } from "react";
import DialogBox from "../../components/dialog-box/DialogBox";
import EmotionContainer from "../../components/emotion-container/EmotionContainer";
import Face from "../../components/face/Face";
import FaceContainer from "../../components/face/FaceContainer";
import { Emotions } from "../../components/face/constants";
import ButtonContainer from "./ButtonContainer";
import EmotionSelectButton from "./EmotionSelectButton";
import { getEmotionSelectText } from "./use-emotion-select-text";
import EmotionConfirmButton from "./emotion-confirm-button/EmotionConfirmButton";
import { Link } from "react-router-dom";

export default function EmotionSelectPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotions>();
  const emotionText = getEmotionSelectText({ emotion: selectedEmotion });

  const updateEmotion = useCallback(
    (emotion: Emotions) => {
      if (emotion === selectedEmotion) {
        return setSelectedEmotion(undefined);
      }
      return setSelectedEmotion(emotion);
    },
    [selectedEmotion]
  );

  return (
    <EmotionContainer emotion={selectedEmotion ?? Emotions.happy}>
      <DialogBox
        text={emotionText}
        emotion={selectedEmotion ?? Emotions.happy}
      />

      <FaceContainer>
        <Face emotion={selectedEmotion ?? Emotions.happy} />
      </FaceContainer>
      <Link to={`confirm/${selectedEmotion}`}>
        <EmotionConfirmButton emotion={selectedEmotion} />
      </Link>
      <ButtonContainer>
        <EmotionSelectButton
          onClick={() => {
            updateEmotion(Emotions.happy);
          }}
          className="green"
          selected={selectedEmotion === Emotions.happy}
        >
          😀
        </EmotionSelectButton>
        <EmotionSelectButton
          onClick={() => {
            updateEmotion(Emotions.angry);
          }}
          className="red"
          selected={selectedEmotion === Emotions.angry}
        >
          😡
        </EmotionSelectButton>
        <EmotionSelectButton
          onClick={() => {
            updateEmotion(Emotions.sad);
          }}
          className="blue"
          selected={selectedEmotion === Emotions.sad}
        >
          😢
        </EmotionSelectButton>
        <EmotionSelectButton
          onClick={() => {
            updateEmotion(Emotions.anxious);
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
