import { motion } from "framer-motion";
import { emotionToTextMap } from "../../../components/constants";
import { Emotions } from "../../../components/face/constants";
import "./emotion-confirm-button.scss";

export default function EmotionConfirmButton({
  emotion,
}: {
  emotion?: Emotions;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: emotion ? 1 : 0 }}
      exit={{
        opacity: 0,
        scaleY: 0,
        transition: { type: "tween", duration: 0.5 },
      }}
      transition={{
        duration: 0.1,
        type: "spring",
        stiffness: 1000,
        damping: 25,
      }}
      className={["button", "emotion-confirm-button"].join(" ")}
    >
      {emotion !== undefined
        ? `I'm feeling ${emotionToTextMap[emotion].toUpperCase()}`
        : " "}
    </motion.button>
  );
}
