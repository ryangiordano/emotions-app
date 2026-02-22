import { useNavigate, useParams } from "react-router-dom";
import FaceContainer from "../emotion-select/FaceContainer";
import EmotionContainer from "../../components/emotion-container/EmotionContainer";
import { Emotions } from "../../components/face/constants";
import DialogBox from "../../components/dialog-box/DialogBox";
import Face from "../../components/face/Face";
import AnimatedButton from "../../components/buttons/AnimatedButton";
import { calmBackground, calmThemeStyle } from "../../components/constants";
import TopNav from "../../components/nav/TopNav";
import BottomNav from "../../components/nav/BottomNav";
import CurrentUserSelect from "../emotion-select/CurrentUserSelect";

export default function EmotionCheckinPage() {
  const { emotion } = useParams();
  const navigate = useNavigate();

  return (
    <EmotionContainer
      emotion={Emotions.neutral}
      backgroundOverride={calmBackground}
      themeStyle={calmThemeStyle}
    >
      <TopNav>
        <CurrentUserSelect />
      </TopNav>

      <DialogBox
        text={"How are you feeling now?"}
        emotion={Emotions.neutral}
      />
      <FaceContainer>
        <Face emotion={Emotions.neutral} />
      </FaceContainer>

      <BottomNav
        topAccessories={
          <div className="nav-button-container">
            <AnimatedButton
              background="linear-gradient(to bottom, #00e67b, #00b3e6)"
              onClick={() => navigate("/")}
            >
              Better
            </AnimatedButton>
            <AnimatedButton
              background="linear-gradient(to bottom, #999, #bbb)"
              onClick={() => navigate(`/journal/${emotion}`)}
            >
              Same
            </AnimatedButton>
            <AnimatedButton
              background="linear-gradient(to bottom, #EB3E3E, #F4D18D)"
              onClick={() => navigate(`/journal/${emotion}`)}
            >
              Worse
            </AnimatedButton>
          </div>
        }
      />
    </EmotionContainer>
  );
}
