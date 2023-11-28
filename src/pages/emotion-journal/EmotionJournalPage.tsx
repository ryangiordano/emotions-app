import { Link, useParams } from "react-router-dom";
import EmotionContainer from "../../components/emotion-container/EmotionContainer";
import { Emotions } from "../../components/face/constants";
import AnimatedButton from "../../components/buttons/AnimatedButton";
import { emotionBackgroundMap } from "../../components/constants";
import "./emotion-journal.scss";
import DialogBox from "../../components/dialog-box/DialogBox";

export default function EmotionJournalPage() {
  const { emotion } = useParams();

  return (
    <EmotionContainer emotion={emotion as Emotions}>
      <DialogBox
        emotion={emotion as Emotions}
        text={"Write your thoughts and feelings here..."}
      />
      <div className="journal-container">
        <textarea
          style={{
            width: "100%",
            height: "100%",
          }}
          className="journal-textarea"
          placeholder="Today I'm feeling..."
        ></textarea>
      </div>
      <div className="nav-button-container">
        <Link to={`/`}>
          <AnimatedButton
            background={emotionBackgroundMap[emotion as Emotions]}
          >
            ◀
          </AnimatedButton>
        </Link>
        <AnimatedButton background={emotionBackgroundMap[emotion as Emotions]}>
          Submit
        </AnimatedButton>
      </div>
    </EmotionContainer>
  );
}