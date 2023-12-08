import { MotionProps, motion } from "framer-motion";
import { emotionBackgroundMap } from "../constants";
import { Emotions } from "../face/constants";

export default function EmotionBackground({
  emotion,
  children,
  ...rest
}: {
  children: React.ReactNode;
  emotion: Emotions;
} & MotionProps) {
  return (
    <motion.div
      animate={{ background: emotionBackgroundMap[emotion] }}
      transition={{ duration: 1 }}
      className={"emotion-container"}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
