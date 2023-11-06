import { emotionBackgroundMap } from "../constants";
import { Emotions } from "../face/constants";
import "./emotion-container.scss";
import { motion } from "framer-motion";

export default function EmotionContainer({
  children,
  emotion,
}: {
  children: React.ReactNode;
  emotion: Emotions;
}) {
  return (
    <motion.div
      animate={{ background: emotionBackgroundMap[emotion] }}
      transition={{ duration: 1 }}
      className={"emotion-container"}
    >
      {children}
    </motion.div>
  );
}
