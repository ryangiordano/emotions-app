import { motion } from "framer-motion";
import { Emotions } from "../face/constants";
import "./dialog-box.scss";
import { emotionBackgroundMap } from "../constants";
import { useMemo } from "react";
export default function DialogBox({
  text,
  emotion,
}: {
  text?: string;
  emotion: Emotions;
}) {
  const reversedText = useMemo(() => {
    return text?.split("").reverse().join("");
  }, [text]);
  return (
    <div style={{ display: "flex" }}>
      <motion.div
        animate={{ background: emotionBackgroundMap[emotion] }}
        className="dialog-box"
      >
        {text?.split("").map((el, i, arr) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.01,
              delay: i / 50,
            }}
            key={`${i} ${el} ${reversedText?.[i]}`}
          >
            {el}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
