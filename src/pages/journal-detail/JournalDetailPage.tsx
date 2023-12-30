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
  const unavailable = isLoading || isFetching;
  const journalData = data?.data();
  const animatedText = useAnimatedText({
    text: journalData?.text ?? "",
    speed: 70,
  });
  const seconds = (journalData?.timestamp?.seconds ?? 1) * 1000;
  return (
    <EmotionBackground
      emotion={
        unavailable ? Emotions.sad : journalData?.emotion ?? Emotions.sad
      }
    >
      {unavailable ? (
        <LoadingPage />
      ) : (
        <div>
          <h1 className="journal-title-text">
            {format(seconds, "MMM dd, yyyy")}
          </h1>
          <p className="journal-meta-text">{format(seconds, "h:mm a")}</p>
          <p className="journal-detail-text">{animatedText}</p>
        </div>
      )}
    </EmotionBackground>
  );
}
