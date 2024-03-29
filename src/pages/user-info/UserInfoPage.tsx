import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import EmotionPieGraph from "../../components/datavis/EmotionPieGraph";
import EmotionBackground from "../../components/emotion-container/EmotionBackground";
import { Emotions } from "../../components/face/constants";
import {
  endOfDay,
  endOfMonth,
  format,
  parse,
  startOfDay,
  startOfMonth,
  sub,
} from "date-fns";
import "../../components/forms/inputs/text-input.scss";
import { getJournalsByUser } from "../../services/firebase/journal-service";
import { db } from "../../services/firebase";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../utils/loading-page/LoadingPage";
import BottomNav from "../../components/nav/BottomNav";
import TopNav from "../../components/nav/TopNav";
import BackButton from "../../components/nav/buttons/BackButton";
import EmotionCalendar from "./emotion-calendar/EmotionCalendar";
import CurrentUserSelect from "../emotion-select/CurrentUserSelect";

export default function UserInfoPage() {
  const [date, setDate] = useState(
    new Date(localStorage?.getItem("date") ?? new Date()),
  );
  const { id } = useParams();

  const setAndSaveDate = useCallback(
    (date: Date) => {
      setDate(date);
      localStorage?.setItem("date", date.toISOString());
    },
    [date],
  );
  const {
    data: journalData,
    isError,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: `journals-${id}-${startOfMonth(date).toISOString()}-${endOfMonth(date).toISOString()}`,
    queryFn: async () => {
      return await getJournalsByUser(
        db,
        id ?? "0",
        startOfMonth(date),
        endOfMonth(date),
      );
    },
  });

  const max = new Date();
  const min = sub(new Date(), { years: 5 });

  const emotionDataHash = journalData?.docs.reduce<Record<Emotions, number>>(
    (acc, doc) => {
      if (acc[doc.data().emotion]) {
        acc[doc.data().emotion] += 1;
      } else {
        acc[doc.data().emotion] = 1;
      }
      return acc;
    },
    {
      happy: 0,
      sad: 0,
      angry: 0,
      anxious: 0,
      neutral: 0,
    },
  );

  const emotionData = Object.keys(emotionDataHash ?? {}).map((key) => {
    return {
      emotion: key as Emotions,
      value: emotionDataHash?.[key as Emotions] ?? null,
    };
  });

  const navigate = useNavigate();
  return (
    <EmotionBackground emotion={Emotions.happy}>
      <div>
        <TopNav>
          <BackButton
            onClick={() => {
              window.history.back();
            }}
          />
          <CurrentUserSelect
            onChangeUser={(userId) => {
              navigate(`/user-info/${userId}`, {
                replace: true,
              });
            }}
          />
        </TopNav>
        <input
          className="ui-input date"
          max={format(max, "yyyy-MM")}
          min={format(min, "yyyy-MM")}
          type="month"
          value={format(date, "yyyy-MM")}
          onChange={(e) => {
            const date = parse(e.target.value, "yyyy-MM", new Date());
            setAndSaveDate(date);
          }}
        />

        {isLoading || isFetching || isError ? (
          <LoadingPage full={false} />
        ) : (
          <>
            <EmotionPieGraph emotionData={emotionData ?? []} />
            <EmotionCalendar
              date={date}
              journals={
                journalData?.docs.map((journalDoc) => journalDoc.data()) ?? []
              }
              onClickMonth={() => {
                navigate(
                  `/journal/list/${id}?startDate=${startOfMonth(
                    date,
                  ).toISOString()}&endDate=${endOfMonth(date).toISOString()}`,
                );
              }}
              onClickDate={(date: Date) => {
                navigate(
                  `/journal/list/${id}?startDate=${startOfDay(
                    date,
                  ).toISOString()}&endDate=${endOfDay(date).toISOString()}`,
                );
              }}
            />
          </>
        )}
      </div>
      <BottomNav />
    </EmotionBackground>
  );
}
