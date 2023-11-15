import { useParams } from "react-router-dom";
import FaceContainer from "../../components/face/FaceContainer";
import ConfirmationContainer from "./ConfirmationContainer";
import EmotionContainer from "../../components/emotion-container/EmotionContainer";
import { Emotions } from "../../components/face/constants";
import DialogBox from "../../components/dialog-box/DialogBox";
import Face from "../../components/face/Face";

export default function EmotionConfirmPage() {
  const { emotion } = useParams();
  if (emotion === undefined) {
    throw new Error("Emotion is undefined");
  }
  return (
    <EmotionContainer emotion={emotion as Emotions}>
      <DialogBox
        text={`When we're angry or out of control, we can try to take deep breaths. 
          
          Let's try it together!`}
        emotion={emotion as Emotions}
      />
      <FaceContainer>
        <Face emotion={emotion as Emotions} />
      </FaceContainer>

      <ConfirmationContainer />
    </EmotionContainer>
  );
}
