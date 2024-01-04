import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { db } from "../../services/firebase";
import { getJournalsByUser } from "../../services/firebase/journal-service";
import JournalList from "../user-info/JournalList";
import { endOfMonth, format, isSameDay, startOfMonth } from "date-fns";
import EmotionBackground from "../../components/emotion-container/EmotionBackground";
import { Emotions } from "../../components/face/constants";
import LoadingPage from "../../utils/loading-page/LoadingPage";
import TopNav from "../../components/nav/TopNav";
import BackButton from "../../components/nav/buttons/BackButton";
import UserInfoSelect from "../user-info/UserInfoSelect";
import { getUsers, getUser } from "../../services/firebase/user-service";

export default function JournalListPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const start = startDate ? new Date(startDate) : startOfMonth(new Date());
  const end = endDate ? new Date(endDate) : endOfMonth(new Date());
  const {
    data: journalData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: `journals-${id}-${start.toISOString()}-${end.toISOString()}`,
    queryFn: () => {
      return getJournalsByUser(db, id ?? "0", start, end);
    },
  });
  const loading = isLoading || isFetching;
  const header = isSameDay(start, end)
    ? format(start, "MMMM dd, yyyy")
    : format(start, "MMMM, yyyy");

  const { data } = useQuery({
    queryKey: `user-${id}`,
    queryFn: () => getUser(db, id ?? "0"),
  });
  return (
    <EmotionBackground emotion={loading ? Emotions.anxious : Emotions.happy}>
      <TopNav>
        <BackButton
          onClick={() => {
            window.history.back();
          }}
        />
        <h1 style={{ marginRight: "auto" }}>{data?.data()?.name}</h1>
      </TopNav>
      <h2 style={{ marginTop: 0 }}>{header}</h2>

      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <JournalList journals={journalData?.docs ?? []} />
        </>
      )}
    </EmotionBackground>
  );
}
