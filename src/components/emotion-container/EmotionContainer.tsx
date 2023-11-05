import { Emotions } from "../face/constants";
import "./emotion-container.scss";
import { motion } from "framer-motion";

const emotionMap = {
  [Emotions.happy]: "linear-gradient(to bottom, #00e67b, #00b3e6)",
  [Emotions.angry]: "linear-gradient(to bottom, #EB3E3E, #F4D18D)",
  [Emotions.sad]: "linear-gradient(to bottom, #5161E9, #E8CBFF)",
  [Emotions.anxious]: "linear-gradient(to bottom, #F0DD32, #FED992)",
};

export default function EmotionContainer({
  children,
  emotion,
}: {
  children: React.ReactNode;
  emotion: Emotions;
}) {
  return (
    <motion.div
      animate={{ background: emotionMap[emotion] }}
      transition={{ duration: 1 }}
      className={"emotion-container"}
    >
      {children}
    </motion.div>
  );
}
