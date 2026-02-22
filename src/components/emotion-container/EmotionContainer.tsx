import { type Emotions } from "../face/constants";
import EmotionBackground from "./EmotionBackground";
import "./emotion-container.scss";

export default function EmotionContainer({
  children,
  emotion,
  className,
  backgroundOverride,
  themeStyle,
}: {
  children: React.ReactNode;
  emotion: Emotions;
  className?: string;
  backgroundOverride?: string;
  themeStyle?: React.CSSProperties;
}) {
  return (
    <EmotionBackground emotion={emotion} className={className} backgroundOverride={backgroundOverride} themeStyle={themeStyle}>
      {children}
    </EmotionBackground>
  );
}
