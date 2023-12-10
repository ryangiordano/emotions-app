import { motion } from "framer-motion";
import { Emotions } from "../face/constants";
import "./dialog-box.scss";
import { emotionBackgroundMap } from "../constants";
export default function DialogBox({
  text,
  emotion,
}: {
  text?: string;
  emotion: Emotions;
}) {
  return (
    <div style={{ display: "flex" }}>
      <motion.div
        animate={{ background: emotionBackgroundMap[emotion] }}
        className="dialog-box"
      >
        {text}
      </motion.div>
    </div>
  );
}
