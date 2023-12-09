import { MotionProps, motion } from "framer-motion";
import { emotionBackgroundMap } from "../constants";
import { Emotions } from "../face/constants";

export default function EmotionBackground({
  emotion,
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  emotion: Emotions;
  className?: string;
} & MotionProps) {
  console.log(className);
  return (
    <motion.div
      animate={{ background: emotionBackgroundMap[emotion] }}
      transition={{ duration: 1 }}
      className={`emotion-container ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
