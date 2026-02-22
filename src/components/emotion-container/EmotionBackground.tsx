import { type MotionProps, motion } from "framer-motion";
import { emotionBackgroundMap } from "../constants";
import { type Emotions } from "../face/constants";

export default function EmotionBackground({
  emotion,
  children,
  className,
  backgroundOverride,
  themeStyle,
  ...rest
}: {
  children: React.ReactNode;
  emotion: Emotions;
  className?: string;
  backgroundOverride?: string;
  themeStyle?: React.CSSProperties;
} & MotionProps) {
  return (
    <motion.div
      animate={{ background: backgroundOverride ?? emotionBackgroundMap[emotion] }}
      transition={{ duration: 1 }}
      className={`emotion-container ${className}`}
      style={themeStyle}
    >
      <motion.div
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        initial={{ opacity: 0 }}
        exit={{
          opacity: 0,
        }}
        style={{
          height: "100%",
        }}
        {...rest}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
