import AngryFace from "./AngryFace";
import AnxiousFace from "./AnxiousFace";
import HappyFace from "./HappyFace";
import SadFace from "./SadFace";
import { Emotions } from "./constants";

const faceMap = {
  [Emotions.happy]: <HappyFace />,
  [Emotions.angry]: <AngryFace />,
  [Emotions.sad]: <SadFace />,
  [Emotions.anxious]: <AnxiousFace />,
};

export default function Face({ emotion }: { emotion: Emotions }) {
  return <>{faceMap[emotion]}</>;
}
