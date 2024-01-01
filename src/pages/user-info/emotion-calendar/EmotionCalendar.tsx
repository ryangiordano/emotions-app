import {
  eachDayOfInterval,
  endOfMonth,
  getDaysInMonth,
  getWeeksInMonth,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { Journal } from "../../../services/firebase/types";
import "./emotion-calendar.scss";

function CalendarCel({ date, entries }: { date: Date; entries: Journal[] }) {
  return (
    <div className={`calendar-cell ${entries.length ? "active" : ""}`}>
      {date.getDate()}
    </div>
  );
}

export default function EmotionCalendar({
  date,
  journals,
}: {
  date: Date;
  journals: Journal[];
}) {
  const aggregatedJournals = journals.reduce<Record<string, Journal[]>>(
    (acc, journal) => {
      const date = journal.timestamp.seconds * 1000;
      const day = new Date(date).getDate();
      if (acc[day]) {
        acc[day].push(journal);
      } else {
        acc[day] = [journal];
      }
      return acc;
    },
    {}
  );
  const daysInMonth = getDaysInMonth(date);
  const arr: { date: Date; entries: Journal[] }[] = [];

  for (let i = 0; i < daysInMonth; i++) {
    const day = new Date(date.getFullYear(), date.getMonth(), i + 1);
    arr.push({
      date: day,
      entries: aggregatedJournals[i + 1] ?? [],
    });
  }

  return (
    <div className="calendar-container">
      {arr.map(({ date, entries }) => {
        return <CalendarCel date={date} entries={entries ?? []} />;
      })}
    </div>
  );
}
