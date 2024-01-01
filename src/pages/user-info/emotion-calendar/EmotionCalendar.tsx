import { format, getDaysInMonth } from "date-fns";
import { Journal } from "../../../services/firebase/types";
import "./emotion-calendar.scss";

function CalendarCel({
  date,
  entries,
  onClick,
}: {
  date: Date;
  entries: Journal[];
  onClick: (date: Date) => void;
}) {
  return (
    <button
      onClick={() => onClick(date)}
      className={`calendar-cell ${entries.length ? "active" : ""}`}
    >
      {date.getDate()}
    </button>
  );
}

export default function EmotionCalendar({
  date,
  journals,
  onClickDate,
  onClickMonth,
}: {
  date: Date;
  journals: Journal[];
  onClickDate: (date: Date) => void;
  onClickMonth: () => void;
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
    <>
      <button onClick={() => onClickMonth()}>
        <h2> {format(date, "MMMM yyyy")}</h2>
      </button>
      <div className="calendar-container">
        {arr.map(({ date, entries }) => {
          return (
            <CalendarCel
              date={date}
              entries={entries ?? []}
              key={date.toISOString()}
              onClick={onClickDate}
            />
          );
        })}
      </div>
    </>
  );
}
