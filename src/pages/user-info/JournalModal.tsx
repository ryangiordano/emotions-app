import { useQuery } from "react-query";
import { emotionBackgroundMap } from "../../components/constants";
import Modal from "../../components/modal/Modal";
import { db } from "../../services/firebase";
import { useParams } from "react-router-dom";
import { getJournalsByUser } from "../../services/firebase/journal-service";
import JournalList from "./JournalList";
import { format, isSameDay } from "date-fns";
import LoadingPage from "../../utils/loading-page/LoadingPage";

export default function JournalModal({
  isOpen,
  onClose,
  startDate,
  endDate,
}: {
  isOpen: boolean;
  onClose: () => void;
  startDate: Date;
  endDate: Date;
}) {
  const { id } = useParams();

  const {
    data: journalData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: `journals-${id}-${startDate}-${endDate}`,
    queryFn: () => {
      return getJournalsByUser(db, id ?? "0", startDate, endDate);
    },
  });
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
      backgroundColor={emotionBackgroundMap["anxious"]}
    >
      {isLoading || isFetching ? (
        <LoadingPage />
      ) : (
        <JournalList journals={journalData?.docs ?? []} />
      )}
    </Modal>
  );
}
