import { useState } from "react";
import { useQuery } from "react-query";
import EmotionPieGraph from "../../components/datavis/EmotionPieGraph";
import EmotionBackground from "../../components/emotion-container/EmotionBackground";
import { Emotions } from "../../components/face/constants";
import NavBar from "../../components/nav/NavBar";
import { endOfMonth, format, parse, startOfMonth, sub } from "date-fns";
import "../../components/forms/inputs/text-input.scss";
import { getJournalsByUser } from "../../services/firebase/journal-service";
import { db } from "../../services/firebase";
import { useParams } from "react-router-dom";
import LoadingPage from "../../utils/loading-page/LoadingPage";

export default function UserInfoPage() {
  const [date, setDate] = useState(new Date());
  const { id } = useParams();

  const { data, isError, isFetching, isLoading } = useQuery({
    queryKey: `journals-${date}`,
    queryFn: () => {
      if (!id) return Promise.resolve({} as any);

      return getJournalsByUser(db, id, startOfMonth(date), endOfMonth(date));
    },
  });
  const max = new Date();
  const min = sub(new Date(), { years: 5 });

  const emotionDataHash = data?.reduce((acc: any, doc: any) => {
    if (acc[doc.data().emotion]) {
      acc[doc.data().emotion] += 1;
    } else {
      acc[doc.data().emotion] = 1;
    }
    return acc;
  }, {});

  const emotionData = Object.keys(emotionDataHash ?? {}).map((key) => {
    return {
      emotion: key as Emotions,
      value: emotionDataHash[key],
    };
  });
  return (
    <EmotionBackground emotion={Emotions.happy}>
      <NavBar
        extraActions={
          <input
            className="ui-input date"
            max={format(max, "yyyy-MM")}
            min={format(min, "yyyy-MM")}
            type="month"
            value={format(date, "yyyy-MM")}
            onChange={(e) => {
              const date = parse(e.target.value, "yyyy-MM", new Date());
              setDate(date);
            }}
          />
        }
      />
      {isLoading || isFetching || isError ? (
        <LoadingPage />
      ) : (
        <EmotionPieGraph emotionData={emotionData ?? []} />
      )}
    </EmotionBackground>
  );
}
