import { Link, useParams } from "react-router-dom";
import FaceContainer from "../emotion-select/FaceContainer";
import EmotionContainer from "../../components/emotion-container/EmotionContainer";
import { Emotions } from "../../components/face/constants";
import DialogBox from "../../components/dialog-box/DialogBox";
import Face from "../../components/face/Face";
import AnimatedButton from "../../components/buttons/AnimatedButton";
import { emotionBackgroundMap } from "../../components/constants";

export default function EmotionCheckinPage() {
  return (
    <EmotionContainer emotion={Emotions.neutral}>
      <DialogBox text={"How are you feeing now?"} emotion={Emotions.neutral} />
      <FaceContainer>
        <Face emotion={Emotions.neutral} />
      </FaceContainer>

      <div className="nav-button-container">
        <Link to={`/`}>
          <AnimatedButton background={emotionBackgroundMap[Emotions.neutral]}>
            ◀
          </AnimatedButton>
        </Link>
      </div>
    </EmotionContainer>
  );
}
