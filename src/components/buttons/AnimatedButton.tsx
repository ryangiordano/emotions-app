import { HTMLMotionProps, motion } from "framer-motion";
import "./animated-button.scss";
import LoadingPage from "../../utils/loading-page/LoadingPage";

export default function AnimatedButton({
  children,
  className,
  background,
  onClick,
  isLoading,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  background?: string;
  isLoading?: boolean;
} & HTMLMotionProps<"button">) {
  return (
    <motion.button
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{
        opacity: 1,
        scaleY: children ? 1 : 0,
        background,
        x: 0,
      }}
      exit={{
        opacity: 0,
        scaleY: 0,
        x: -200,
        transition: { type: "tween", duration: 0.5 },
      }}
      transition={{
        duration: 0.25,
      }}
      className={["button", "animated-button", className].join(" ")}
      onClick={onClick}
      {...rest}
    >
      {isLoading ? <LoadingPage full={false} /> : children}
    </motion.button>
  );
}
