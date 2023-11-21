import { Link, useNavigate } from "react-router-dom";
import AnimatedButton from "../../../components/buttons/AnimatedButton";
import { emotionBackgroundMap } from "../../../components/constants";
import DialogBox from "../../../components/dialog-box/DialogBox";
import EmotionContainer from "../../../components/emotion-container/EmotionContainer";
import Face from "../../../components/face/Face";
import { Emotions } from "../../../components/face/constants";
import ConfirmationContainer from "../../emotion-confirm/ConfirmationContainer";
import FaceContainer from "../../emotion-select/FaceContainer";
import Fireball from "../../../components/face/assets/Fireball";
import anime from "animejs";
import { memo, useMemo, useRef, useState } from "react";
import "./angry-activity.scss";
import { getRandomBetween } from "../../../utils/random";

function randomBetweenTwoInts(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function disperse(element?: SVGSVGElement) {
  for (let i = 0; i < 15; i++) {
    const fire = document.createElement("div");
    fire.classList.add("small-fire");
    fire.setAttribute(
      "style",
      `
      bottom: ${element?.style.bottom};
      left: ${element?.style.left};
      pointer-events: none;
      `
    );
    document.body.appendChild(fire);
    anime({
      targets: fire,
      translateX: getRandomBetween(-400, 400),
      translateY: getRandomBetween(-400, 400),
      scale: [1, 0],
      opacity: [1, 0],
      duration: randomBetweenTwoInts(1000, 2000),
      easing: "easeOutQuad",
      complete: () => {
        fire.remove();
      },
    });
  }
}

const FloatingFire = memo(
  ({ onClick }: { key: number; onClick?: () => void }) => {
    const [visible, setVisible] = useState(true);
    const ref = useRef<any>(null);

    const bottom = useMemo(() => {
      return randomBetweenTwoInts(
        0,
        document.body.clientHeight - document.body.clientHeight * 0.1
      );
    }, []);

    const left = useMemo(() => {
      return randomBetweenTwoInts(
        -document.body.clientWidth * 0.15,
        document.body.clientWidth - document.body.clientWidth * 0.25
      );
    }, []);
    const animationDuration = useMemo(() => {
      return `${randomBetweenTwoInts(250, 500)}ms`;
    }, []);

    if (!visible) {
      return <></>;
    }
    return (
      <Fireball
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
        <Link to={`/`}>
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
      <ConfirmationContainer />
    </EmotionContainer>
  );
}
