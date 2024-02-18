import {
  emotionBackgroundMap,
  emotionToTextMap,
} from "../../../components/constants";
import { type Emotions } from "../../../components/face/constants";
import "./emotion-confirm-button.scss";
import AnimatedButton from "../../../components/buttons/AnimatedButton";

export default function EmotionConfirmButton({
  emotion,
}: {
  emotion?: Emotions;
}) {
  return (
    <>
      {emotion !== undefined ? (
        <AnimatedButton
          background={emotionBackgroundMap[emotion]}
          style={{ height: "unset" }}
        >
          {emotion !== undefined
            ? `I'm feeling ${emotionToTextMap[emotion].toUpperCase()}`
            : " "}
        </AnimatedButton>
      ) : (
        <></>
      )}
    </>
  );
}
