import { Link, useNavigate } from "react-router-dom";
import AnimatedButton from "../../../components/buttons/AnimatedButton";
import { emotionBackgroundMap } from "../../../components/constants";
import DialogBox from "../../../components/dialog-box/DialogBox";
import EmotionContainer from "../../../components/emotion-container/EmotionContainer";
import Face from "../../../components/face/Face";
import { Emotions } from "../../../components/face/constants";
import FaceContainer from "../../emotion-select/FaceContainer";
import { useMemo, useRef } from "react";
import HappyCardGrid from "./HappyCardGrid";

/** Score goes up to 4 */
function getTextByScore(score: number) {
  if (score < 1) {
    return "Try to match the tiles...";
  } else if (score < 2) {
    return "There we go!";
  } else if (score === 3) {
    return "Almost done!";
  }
  return "Well done!";
}

// shuffle an array of integers
function shuffleArray<T>(arr: T[]) {
  let i = arr.length - 1;
  while (i > 0) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i--;
  }
  return arr;
}

export default function HappyActivity() {
  const shuffledEmotions = useMemo(() => {
    return shuffleArray([
      Emotions.happy,
      Emotions.happy,
      Emotions.sad,
      Emotions.sad,
      Emotions.angry,
      Emotions.angry,
      Emotions.anxious,
      Emotions.anxious,
    ]);
  }, []);

  const score = useRef(0);
  const navigate = useNavigate();
  return (
    <EmotionContainer emotion={Emotions.happy}>
      <DialogBox
        text={getTextByScore(score.current)}
        emotion={Emotions.happy}
      />
      <div className={"happy-activity-container"}>
        <div className="happy-activity-face-container">
          <FaceContainer>
            <Face emotion={Emotions.happy} />
          </FaceContainer>
        </div>
        <HappyCardGrid
          array={shuffledEmotions}
          onComplete={() => navigate("/")}
        />
      </div>

      <div className="nav-button-container">
        <Link to={`/`}>
          <AnimatedButton background={emotionBackgroundMap[Emotions.happy]}>
            ◀
          </AnimatedButton>
        </Link>
      </div>
    </EmotionContainer>
  );
}
