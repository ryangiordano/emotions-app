import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import EmotionBackground from "../../components/emotion-container/EmotionBackground";
import { db } from "../../services/firebase";
import { getJournal } from "../../services/firebase/journal-service";
import LoadingPage from "../../utils/loading-page/LoadingPage";
import { Emotions } from "../../components/face/constants";

import "./journal-detail.scss";
import useAnimatedText from "../../components/animation/animated-text/use-animated-text";
import { format } from "date-fns";
import TopNav from "../../components/nav/TopNav";
import BackButton from "../../components/nav/buttons/BackButton";
import { useCallback, useEffect, useMemo } from "react";

export default function JournalDetailPage() {
  const { id } = useParams<{ id: string }>();

  if (id === undefined) {
    throw new Error("id is undefined");
  }
  const { data, isFetching, isLoading } = useQuery({
    queryKey: `journals-${id}`,
    queryFn: () => {
      return getJournal(db, id!);
    },
  });
  const loading = isLoading || isFetching;
  const journalData = data?.data();
  const animatedText = useAnimatedText({
    text: journalData?.text ?? "",
    speed: 70,
  });
  const seconds = (journalData?.timestamp?.seconds ?? 1) * 1000;
  console.log(window.speechSynthesis.getVoices());

  const utterance = useMemo(() => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.voice =
      window.speechSynthesis.getVoices().find((voice) => {
        return voice.name === "Google UK English Female";
      }) ?? null;
    utterance.pitch = 1.3;
    utterance.rate = 1.1;
    return utterance;
  }, []);

  const playAudio = useCallback(() => {
    if (journalData?.text) {
      utterance.text = journalData.text;
      window.speechSynthesis.speak(utterance);
    }
  }, [journalData?.text, utterance]);

  return (
    <EmotionBackground
      emotion={loading ? Emotions.sad : journalData?.emotion ?? Emotions.sad}
    >
      <TopNav>
        <BackButton
          onClick={() => {
            window.history.back();
          }}
        />
        <h1 style={{ marginRight: "auto" }}>
          {loading ? "" : format(seconds, "MMM dd, yyyy")}
        </h1>
      </TopNav>
      {loading ? (
        <LoadingPage />
      ) : (
        <div style={{ marginBottom: "auto" }}>
          <p className="journal-meta-text">{format(seconds, "h:mm a")}</p>
          <p className="journal-detail-text">{animatedText}</p>
          <button onClick={playAudio}>Read</button>
        </div>
      )}
    </EmotionBackground>
  );
}
