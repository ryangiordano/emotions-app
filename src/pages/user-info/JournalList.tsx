import { Link } from "react-router-dom";

import "./journal-list.scss";
import { emotionColorMap } from "../../components/constants";
import { Emotions } from "../../components/face/constants";

export default function JournalList({ journals }: { journals: any[] }) {
  return (
    <div className="journal-list">
      {journals.map((doc) => {
        const data = doc.data();
        return (
          <Link
            to={`/journal/${doc.id}`}
            key={doc.id}
            className={`journal-list-item ${
              emotionColorMap[data.emotion as Emotions]
            }`}
          >
            {data.text}
          </Link>
        );
      })}
    </div>
  );
}
