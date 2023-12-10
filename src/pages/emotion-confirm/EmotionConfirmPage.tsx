import { Link, useParams } from "react-router-dom";
import FaceContainer from "../emotion-select/FaceContainer";
import EmotionContainer from "../../components/emotion-container/EmotionContainer";
import { Emotions } from "../../components/face/constants";
import DialogBox from "../../components/dialog-box/DialogBox";
import Face from "../../components/face/Face";
import AnimatedButton from "../../components/buttons/AnimatedButton";
import { emotionBackgroundMap } from "../../components/constants";

function getConfirmationText({ emotion }: { emotion: Emotions }) {
  switch (emotion) {
    case Emotions.happy:
      return "You're happy! Can you tell me what's making you feel happy?";
    case Emotions.angry:
      return "When we're angry or out of control, we can try to take deep breaths.\n\n  Let's try it together!";
    case Emotions.anxious:
      return "When we're anxious or silly, we can try to draw a picture or take a break. Squeeze your favorite stuffed animal!";
    case Emotions.sad:
      return "If we're feeling sad, we can talk to someone, ask for a hug, take a walk or close your eyes and take a deep breath.";
  }
}

export default function EmotionConfirmPage() {
  const { emotion } = useParams();
  if (emotion === undefined) {
    throw new Error("Emotion is undefined");
  }
  return (
    <EmotionContainer emotion={emotion as Emotions}>
      <DialogBox
        text={getConfirmationText({ emotion: emotion as Emotions })}
        emotion={emotion as Emotions}
      />
      <FaceContainer>
        <Face emotion={emotion as Emotions} />
      </FaceContainer>

      <div className="nav-button-container">
        <Link to={`/`}>
          <AnimatedButton
            background={emotionBackgroundMap[emotion as Emotions]}
          >
            ◀
          </AnimatedButton>
        </Link>
        <Link to={`/journal/${emotion}`}>
          <AnimatedButton
            background={emotionBackgroundMap[emotion as Emotions]}
          >
            Journal
          </AnimatedButton>
        </Link>
        {emotion === Emotions.angry && (
          <Link to={`/activity/${emotion}`}>
            <AnimatedButton
              background={emotionBackgroundMap[emotion as Emotions]}
            >
              Activity
            </AnimatedButton>
          </Link>
        )}
      </div>
    </EmotionContainer>
  );
}
