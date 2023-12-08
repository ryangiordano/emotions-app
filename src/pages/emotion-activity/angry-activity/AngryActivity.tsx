import { Link } from "react-router-dom";
import AnimatedButton from "../../../components/buttons/AnimatedButton";
import { emotionBackgroundMap } from "../../../components/constants";
import DialogBox from "../../../components/dialog-box/DialogBox";
import EmotionContainer from "../../../components/emotion-container/EmotionContainer";
import Face from "../../../components/face/Face";
import { Emotions } from "../../../components/face/constants";
import FaceContainer from "../../emotion-select/FaceContainer";
import Fireball from "../../../components/face/assets/Fireball";
import { memo, useMemo, useRef, useState } from "react";
import "./angry-activity.scss";
import { getRandomBetween } from "../../../utils/random";
import disperse from "../../../components/face/animations/disperse";

const FloatingFire = memo(
  ({ onClick }: { key: number; onClick?: () => void }) => {
    const id = useRef(Math.random() * 1000);
    const [visible, setVisible] = useState(true);
    const ref = useRef<any>(null);

    const bottom = useMemo(() => {
      return getRandomBetween(
        0,
        document.body.clientHeight - document.body.clientHeight * 0.1
      );
    }, []);

    const left = useMemo(() => {
      return getRandomBetween(
        -document.body.clientWidth * 0.15,
        document.body.clientWidth - document.body.clientWidth * 0.25
      );
    }, []);
    const animationDuration = useMemo(() => {
      return `${getRandomBetween(250, 500)}ms`;
    }, []);

    if (!visible) {
      return <></>;
    }
    return (
      <Fireball
        id={id.current}
        ref={ref}
        onClick={() => {
          disperse(ref.current ?? undefined);
          onClick?.();
          setVisible(false);
        }}
        className={"fireball"}
        style={{
          left,
          bottom,
          animationDuration,
        }}
      />
    );
  }
);

function getTextByScore(score: number) {
  if (score < 3) {
    return "Tap the flames to cool us down";
  } else if (score < 6) {
    return "You're doing great! Keep going!";
  } else if (score < 9) {
    return "I'm starting to feel much better!";
  } else if (score === 9) {
    return "Almost done!";
  }
  return "I'm feeling much better, thank you.";
}

export default function AngryActivity() {
  const fires = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [gameOver, setGameOver] = useState(false);
  const [text, setText] = useState("Tap the flames to cool us down");
  const score = useRef(0);

  const removeFire = () => {
    score.current += 1;
    setText(getTextByScore(score.current) ?? "");
    if (score.current >= fires.length) {
      setTimeout(() => {
        setGameOver(true);
      }, 1000);
    }
  };

  const renderFires = useMemo(() => {
    if (gameOver) {
      return [];
    }
    return fires.map((key) => <FloatingFire key={key} onClick={removeFire} />);
  }, [gameOver]);
  const emotion = gameOver ? Emotions.happy : Emotions.angry;

  return (
    <EmotionContainer emotion={emotion}>
      {renderFires}
      <DialogBox text={text} emotion={emotion} />
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FaceContainer>
          <Face emotion={emotion} />
        </FaceContainer>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
        }}
      >
        <Link to={`/confirm/${emotion}`}>
          <AnimatedButton background={emotionBackgroundMap[emotion]}>
            ◀
          </AnimatedButton>
        </Link>
        {gameOver && (
          <AnimatedButton
            onClick={() => {
              setGameOver(false);
              score.current = 0;
            }}
            background={emotionBackgroundMap[emotion]}
          >
            I'm still angry.
          </AnimatedButton>
        )}
      </div>
    </EmotionContainer>
  );
}
