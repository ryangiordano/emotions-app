import { useParams } from "react-router-dom";
import HappyActivity from "./happy-activity/HappyActivity";
import SadActivity from "./sad-activity/SadActivity";
import AnxiousActivity from "./anxious-activity/AnxiousActivity";
import AngryActivity from "./angry-activity/AngryActivity";

export default function EmotionActivityPage() {
  const { emotion } = useParams();
  if (emotion === undefined) {
    throw new Error("Emotion is undefined");
  }

  switch (emotion) {
    case "happy":
      return <HappyActivity />;
    case "sad":
      return <SadActivity />;
    case "angry":
      return <AngryActivity />;
    case "anxious":
      return <AnxiousActivity />;
    default:
      throw new Error("Emotion is not supported");
  }
}
