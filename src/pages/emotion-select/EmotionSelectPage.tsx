import { useCallback, useState } from "react";
import DialogBox from "../../components/dialog-box/DialogBox";
import EmotionContainer from "../../components/emotion-container/EmotionContainer";
import Face from "../../components/face/Face";
import FaceContainer from "./FaceContainer";
import { Emotions } from "../../components/face/constants";
import { getEmotionSelectText } from "./use-emotion-select-text";
import EmotionConfirmButton from "./emotion-confirm-button/EmotionConfirmButton";
import { Link, useNavigate } from "react-router-dom";
import EmotionSlider from "./emotion-slider/EmotionSlider";
import EmotionSelectButton from "./EmotionSelectButton";
import { InputType } from "../../components/constants";
import InputSwitchButton from "./InputSwitchButton";
import CurrentUserSelect from "./CurrentUserSelect";
import BottomNav from "../../components/nav/BottomNav";
import TopNav from "../../components/nav/TopNav";
import JournalButton from "../../components/nav/buttons/JournalButton";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";

export default function EmotionSelectPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotions>(
    Emotions.happy
  );
  const emotionText = getEmotionSelectText({ emotion: selectedEmotion });
  const [emotionSlider, setEmotionSlider] = useState<number>(0);

  const [inputType, setInputType] = useState<InputType>(InputType.slider);
  const updateEmotion = useCallback(
    (emotion: Emotions) => {
      return setSelectedEmotion(emotion);
    },
    [selectedEmotion]
  );
  const navigate = useNavigate();
  const [loggedInUser, loading] = useIdToken(auth);

  return (
    <EmotionContainer emotion={selectedEmotion ?? Emotions.happy}>
      {loggedInUser && (
        <TopNav>
          <CurrentUserSelect />
          <JournalButton
            onClick={() => navigate(`/journal/${selectedEmotion}`)}
          />
        </TopNav>
      )}

      <DialogBox
        text={emotionText}
        emotion={selectedEmotion ?? Emotions.happy}
      />

      <FaceContainer>
        <Face emotion={selectedEmotion ?? Emotions.happy} />
      </FaceContainer>

      {inputType === InputType.buttons && (
        <div className="emotion-confirm-container buttons">
          <Link to={`confirm/${selectedEmotion}`}>
            <EmotionConfirmButton emotion={selectedEmotion} />
          </Link>
          <div className="inner-emotion-confirm-container">
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
          </div>
        </div>
      )}
      {inputType === InputType.slider && (
        <div className="emotion-confirm-container slider">
          <Link to={`confirm/${selectedEmotion}`}>
            <EmotionConfirmButton emotion={selectedEmotion} />
          </Link>
          <EmotionSlider
            sliderValue={emotionSlider}
            setEmotionSliderValue={setEmotionSlider}
            selectedEmotion={selectedEmotion}
            updateEmotion={updateEmotion}
          />
        </div>
      )}
      <BottomNav
        extraActions={
          <>
            <InputSwitchButton
              inputType={inputType}
              setInputType={setInputType}
            />
          </>
        }
      />
    </EmotionContainer>
  );
}
