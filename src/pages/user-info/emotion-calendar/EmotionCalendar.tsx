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
      if (acc[date]) {
        acc[date].push(journal);
      } else {
        acc[date] = [journal];
      }
      return acc;
    },
    {}
  );

  const arr = new Array(getWeeksInMonth(date)).fill(0).map((_, weekIndex) => {
    return [
      ...new Array(7).fill(null).map((_, weekDayIndex) => {
        return {
          date: new Date(),
          entries: [],
        };
      }),
    ];
  });

  // create an array of arrays of 7, where each element is {date: Date, entries: any[]}

  Object.keys(aggregatedJournals).forEach((timestamp) => {
    const date = new Date(Number(timestamp));
    const dayOfMonth = date.getDate();
    const weekOfMonth = Math.floor(dayOfMonth / 7);
    const dayOfWeek = date.getDay();
    arr[weekOfMonth][dayOfWeek] = {
      date,
      entries: aggregatedJournals[timestamp] as any,
    };
  });

  return (
    <div className="calendar-container">
      {arr.map((week) => {
        return (
          <div className="calendar-row">
            {week.map(({ date, entries }) => {
              return <CalendarCel date={date} entries={entries ?? []} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
