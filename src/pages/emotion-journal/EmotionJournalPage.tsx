import { Link, useParams } from "react-router-dom";
import EmotionContainer from "../../components/emotion-container/EmotionContainer";
import { Emotions } from "../../components/face/constants";
import AnimatedButton from "../../components/buttons/AnimatedButton";
import { emotionBackgroundMap } from "../../components/constants";
import "./emotion-journal.scss";
import DialogBox from "../../components/dialog-box/DialogBox";
import { useRef, useEffect, useState } from "react";
import TextCounter from "./TextCounter";

export default function EmotionJournalPage() {
  const { emotion } = useParams();

  const ref = useRef<HTMLTextAreaElement>(null);
  const textLimit = 250;
  const [text, setText] = useState(ref.current?.value ?? "");

  return (
    <EmotionContainer emotion={emotion as Emotions}>
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
      <div className="nav-button-container">
        <Link to={`/`}>
          <AnimatedButton
            background={emotionBackgroundMap[emotion as Emotions]}
          >
            ◀
          </AnimatedButton>
        </Link>
        {/* TODO: Submit through a service...
          We can use A context to keep track of journals at a top level. The context would use a service, and that service can either be set to local storage and/or a server
        */}
        <Link to={`/`}>
          <AnimatedButton
            background={emotionBackgroundMap[emotion as Emotions]}
          >
            Submit
          </AnimatedButton>
        </Link>
      </div>
    </EmotionContainer>
  );
}
