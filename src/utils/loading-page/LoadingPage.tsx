import EmotionContainer from "../../components/emotion-container/EmotionContainer";
import { Emotions } from "../../components/face/constants";
import "./LoadingPage.scss";

export default function LoadingPage() {
  return (
    <EmotionContainer emotion={Emotions.sad} className="loading-page-container">
      <span className="loader"></span>
    </EmotionContainer>
  );
}
