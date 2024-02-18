import { Link } from "react-router-dom";

import "./journal-list.scss";
import { emotionColorMap } from "../../components/constants";
import { type Emotions } from "../../components/face/constants";
import { AnimatePresence, motion } from "framer-motion";

export default function JournalList({ journals }: { journals: any[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <motion.ul
      className="journal-list"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {journals.map((doc, i) => {
          const data = doc.data();
          return (
            <motion.li
              key={doc.id}
              variants={listItemVariants}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.08, delay: i * 0.08 }}
            >
              <Link
                to={`/journal/detail/${doc.id}`}
                className={`journal-list-item ${
                  emotionColorMap[data.emotion as Emotions]
                }`}
              >
                {data.text}
              </Link>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </motion.ul>
  );
}
