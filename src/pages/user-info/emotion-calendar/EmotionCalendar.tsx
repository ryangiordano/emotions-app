import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { Journal } from "../../../services/firebase/types";
import "./emotion-calendar.scss";
import { AnimatePresence, motion } from "framer-motion";

function CalendarCel({
  date,
  entries,
  onClick,
  inactive,
}: {
  date: Date;
  entries: Journal[];
  onClick: (date: Date) => void;
  inactive?: boolean;
}) {
  return (
    <button
      onClick={() => (entries.length ? onClick(date) : undefined)}
      className={`calendar-cell ${entries.length ? "active" : ""} ${
        inactive ? "inactive" : ""
      }`}
    >
      {inactive ? null : date.getDate()}
    </button>
  );
}

const getWeeksOfMonth = (year: number, month: number) => {
  const startDate = startOfMonth(new Date(year, month - 1));
  const endDate = endOfMonth(new Date(year, month - 1));
  const weeks = eachWeekOfInterval({ start: startDate, end: endDate });

  return weeks.reduce<Date[]>((acc, week) => {
    const days = eachDayOfInterval({
      start: startOfWeek(week),
      end: endOfWeek(week),
    });
    acc.push(...days);
    return acc;
  }, []);
};

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
  const weeksOfMonth = getWeeksOfMonth(date.getFullYear(), date.getMonth() + 1);

  const aggregatedJournals = journals.reduce<Record<string, Journal[]>>(
    (acc, journal) => {
      const date = journal.timestamp.seconds * 1000;
      const day = `${new Date(date).getMonth()}-${new Date(date).getDate()}`;
      if (acc[day]) {
        acc[day].push(journal);
      } else {
        acc[day] = [journal];
      }
      return acc;
    },
    {}
  );
  const arr: { date: Date; entries: Journal[] }[] = [];

  weeksOfMonth.forEach((date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    arr.push({
      date: day,
      entries:
        aggregatedJournals[
          `${new Date(date).getMonth()}-${new Date(date).getDate()}`
        ] ?? [],
    });
  });

  return (
    <div className="calendar-container">
      <button onClick={() => onClickMonth()}>
        <h2> {format(date, "MMMM yyyy")}</h2>
      </button>
      <div className="calendar-grid">
        {arr.map(({ date: calendarDate, entries }, i) => {
          const inactive = calendarDate.getMonth() !== date.getMonth();
          return (
            <CalendarCel
              date={calendarDate}
              entries={entries ?? []}
              onClick={inactive ? () => {} : onClickDate}
              inactive={inactive}
            />
          );
        })}
      </div>
    </div>
  );
}
