import { motion } from "framer-motion";
import { useMemo } from "react";

export default function useAnimatedText({
  text,
  speed = 50,
}: {
  text?: string;
  speed?: number;
}) {
  const reversedText = useMemo(() => {
    return text?.split("").reverse().join("");
  }, [text]);

  return text?.split("").map((el, i, arr) => (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.01,
        delay: i / speed,
      }}
      key={`${i} ${el} ${reversedText?.[i]}`}
    >
      {el}
    </motion.span>
  ));
}
