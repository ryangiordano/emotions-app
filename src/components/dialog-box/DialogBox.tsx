import { motion } from "framer-motion";
import { Emotions } from "../face/constants";
import "./dialog-box.scss";
import { emotionBackgroundMap } from "../constants";
import useAnimatedText from "../animation/animated-text/use-animated-text";
export default function DialogBox({
  text,
  emotion,
}: {
  text?: string;
  emotion: Emotions;
}) {
  const animatedText = useAnimatedText({
    text,
    speed: 50,
  });
  return (
    <div style={{ display: "flex" }}>
      <motion.div
        animate={{ background: emotionBackgroundMap[emotion] }}
        className="dialog-box"
      >
        {animatedText}
      </motion.div>
    </div>
  );
}
