import FaceContainer from "../../components/face/FaceContainer";
import ConfirmationContainer from "./ConfirmationContainer";

export default function EmotionConfirmPage() {
  return (
    <div className="emotion-background">
      <div className=""></div>

      <FaceContainer children={undefined}></FaceContainer>

      <ConfirmationContainer />
    </div>
  );
}
