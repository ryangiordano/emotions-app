import { useCallback, useState } from "react";
import DialogBox from "../../components/dialog-box/DialogBox";
import EmotionContainer from "../../components/emotion-container/EmotionContainer";
import Face from "../../components/face/Face";
import FaceContainer from "../../components/face/FaceContainer";
import { Emotions } from "../../components/face/constants";
import ButtonContainer from "./ButtonContainer";
import { getEmotionSelectText } from "./use-emotion-select-text";
import EmotionConfirmButton from "./emotion-confirm-button/EmotionConfirmButton";
import { Link } from "react-router-dom";
import EmotionSlider from "./emotion-slider/EmotionSlider";

export default function EmotionSelectPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotions>();
  const emotionText = getEmotionSelectText({ emotion: selectedEmotion });
  const [emotionSlider, setEmotionSlider] = useState<number>(0);

  const updateEmotion = useCallback(
    (emotion: Emotions) => {
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

      <ButtonContainer>
        <Link to={`confirm/${selectedEmotion}`}>
          <EmotionConfirmButton emotion={selectedEmotion} />
        </Link>
        <EmotionSlider
          sliderValue={emotionSlider}
          setEmotionSliderValue={setEmotionSlider}
          selectedEmotion={selectedEmotion}
          updateEmotion={updateEmotion}
        />
      </ButtonContainer>
    </EmotionContainer>
  );
}
