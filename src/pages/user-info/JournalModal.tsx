import { useQuery } from "react-query";
import { emotionBackgroundMap } from "../../components/constants";
import Modal from "../../components/modal/Modal";
import { db } from "../../services/firebase";
import { getJournalsByUser } from "../../services/firebase/journal-service";
import JournalList from "./JournalList";
import { format, isSameDay } from "date-fns";
import LoadingPage from "../../utils/loading-page/LoadingPage";

export default function JournalModal({
  isOpen,
  onClose,
  startDate,
  endDate,
  userId,
}: {
  isOpen: boolean;
  onClose: () => void;
  startDate: Date;
  endDate: Date;
  userId: string;
}) {
  const {
    data: journalData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: `journals-${userId}-${startDate.toISOString()}-${endDate.toISOString()}`,
    queryFn: async () => {
      return await getJournalsByUser(db, userId ?? "0", startDate, endDate);
    },
  });
  const loading = isLoading || isFetching;
  return (
    <Modal
      header={
        isSameDay(startDate, endDate)
          ? format(startDate, "MMMM dd, yyyy")
          : format(startDate, "MMMM, yyyy")
      }
      open={isOpen}
      onClose={onClose}
      animatePresence="flip-in-x"
      backgroundColor={
        loading ? emotionBackgroundMap.sad : emotionBackgroundMap.anxious
      }
    >
      {isLoading || isFetching ? (
        <LoadingPage />
      ) : (
        <JournalList journals={journalData?.docs ?? []} />
      )}
    </Modal>
  );
}
