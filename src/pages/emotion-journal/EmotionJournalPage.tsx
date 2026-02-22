import { useNavigate, useParams } from "react-router-dom";
import EmotionContainer from "../../components/emotion-container/EmotionContainer";
import { type Emotions } from "../../components/face/constants";
import AnimatedButton from "../../components/buttons/AnimatedButton";
import {
  emotionBackgroundMap,
  emotionToTextMap,
  getCalmingBackground,
} from "../../components/constants";
import "./emotion-journal.scss";
import DialogBox from "../../components/dialog-box/DialogBox";
import { useMemo, useRef, useState } from "react";
import TextCounter from "./TextCounter";
import { db } from "../../services/firebase";
import { createJournal } from "../../services/firebase/journal-service";
import CurrentUserSelect from "../emotion-select/CurrentUserSelect";
import TopNav from "../../components/nav/TopNav";
import BottomNav from "../../components/nav/BottomNav";
import { toast } from "react-toastify";
import { errorToast } from "../../components/toasts";

export default function EmotionJournalPage() {
  const { emotion } = useParams();

  const ref = useRef<HTMLTextAreaElement>(null);
  const textLimit = 350;
  const [text, setText] = useState(ref.current?.value ?? "");
  const [keystrokeCount, setKeystrokeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const maxKeystrokes = 100;
  const isNegativeEmotion = emotion === "angry" || emotion === "sad" || emotion === "anxious";

  const backgroundOverride = useMemo(() => {
    if (!isNegativeEmotion || !emotion) return undefined;
    const progress = Math.min(keystrokeCount / maxKeystrokes, 1);
    return getCalmingBackground(emotion as Emotions, progress);
  }, [keystrokeCount, emotion, isNegativeEmotion]);

  const successToast = () =>
    toast(
      "Submitted successfully!",

      {
        className: "green",
      },
    );

  return (
    <EmotionContainer emotion={emotion as Emotions} backgroundOverride={backgroundOverride}>
      <TopNav>
        <CurrentUserSelect />
      </TopNav>

      <DialogBox
        emotion={emotion as Emotions}
        text={"Tell me about what you're feeling..."}
      />
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
            setKeystrokeCount((c) => c + 1);
          }}
          value={text}
          className="journal-textarea emotion-journal"
          placeholder={`Today I'm feeling ${emotionToTextMap[
            emotion as Emotions
          ].toLocaleLowerCase()} because...`}
        ></textarea>
      </div>

      <BottomNav
        topAccessories={
          <div className="nav-button-container">
            <AnimatedButton
              disabled={text.length === 0}
              isLoading={isLoading}
              background={emotionBackgroundMap[emotion as Emotions]}
              onClick={() => {
                if (emotion && !isLoading) {
                  setIsLoading(true);
                  createJournal(db, { text, emotion })
                    .then((journal) => {
                      if (journal) {
                        successToast();
                        navigate(`/checkin/${emotion}`);
                      }
                    })
                    .catch(() => {
                      setIsLoading(false);
                      errorToast();
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
