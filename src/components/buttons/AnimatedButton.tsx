import { motion } from "framer-motion";
import "./animated-button.scss";

export default function AnimatedButton({
  children,
  className,
  background,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  background?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: children ? 1 : 0, background }}
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
      className={["button", "animated-button", className].join(" ")}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
