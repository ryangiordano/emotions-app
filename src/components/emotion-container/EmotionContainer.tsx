import { Emotions } from "../face/constants";
import EmotionBackground from "./EmotionBackground";
import "./emotion-container.scss";

export default function EmotionContainer({
  children,
  emotion,
  className,
}: {
  children: React.ReactNode;
  emotion: Emotions;
  className?: string;
}) {
  return (
    <EmotionBackground
      emotion={emotion}
      className={className}
    >
      {children}
    </EmotionBackground>
  );
}
