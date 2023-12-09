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
  console.log(className);
  return (
    <EmotionBackground
      emotion={emotion}
      className={className}
      style={{
        display: "grid",
        gridTemplateRows: ".5fr 3fr",
      }}
    >
      {children}
    </EmotionBackground>
  );
}
