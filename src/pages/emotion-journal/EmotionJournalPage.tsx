import { Link, useNavigate, useParams } from "react-router-dom";
import EmotionContainer from "../../components/emotion-container/EmotionContainer";
import { Emotions } from "../../components/face/constants";
import AnimatedButton from "../../components/buttons/AnimatedButton";
import { emotionBackgroundMap } from "../../components/constants";
import "./emotion-journal.scss";
import DialogBox from "../../components/dialog-box/DialogBox";
import { useRef, useState } from "react";
import TextCounter from "./TextCounter";
import NavBar from "../../components/nav/NavBar";
import { db } from "../../services/firebase";
import { createJournal } from "../../services/firebase/journal-service";
import CurrentUserSelect from "../emotion-select/CurrentUserSelect";
import TopNav from "../../components/nav/TopNav";
import BottomNav from "../../components/nav/BottomNav";

export default function EmotionJournalPage() {
  const { emotion } = useParams();

  const ref = useRef<HTMLTextAreaElement>(null);
  const textLimit = 250;
  const [text, setText] = useState(ref.current?.value ?? "");
  const navigate = useNavigate();
  return (
    <EmotionContainer emotion={emotion as Emotions}>
      <TopNav>
        <CurrentUserSelect />
      </TopNav>

      <DialogBox emotion={emotion as Emotions} text={"Tell me about it..."} />
      <div className="journal-container">
        <TextCounter text={text} limit={textLimit} />
        <textarea
          ref={ref}
          style={{
            width: "100%",
            height: "100%",
          }}
          onChange={(e) => {
            if (e.target.value.length > textLimit) {
              return;
            }
            setText(e.target.value);
          }}
          value={text}
          className="journal-textarea emotion-journal"
          placeholder="Today I'm feeling..."
        ></textarea>
      </div>

      <BottomNav
        topAccessories={
          <div className="nav-button-container">
            <AnimatedButton
              disabled={text.length === 0}
              background={emotionBackgroundMap[emotion as Emotions]}
              onClick={() => {
                if (emotion) {
                  //TODO: Navigate to a 'now how do you feel' page;
                  createJournal(db, { text, emotion }).then((journal) => {
                    if (journal) {
                      navigate("/");
                    }
                  });
                }
              }}
            >
              Submit
            </AnimatedButton>
          </div>
        }
      />
    </EmotionContainer>
  );
}
