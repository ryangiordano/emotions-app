import { Link } from "react-router-dom";
import AnimatedButton from "../../../components/buttons/AnimatedButton";
import { emotionBackgroundMap } from "../../../components/constants";
import DialogBox from "../../../components/dialog-box/DialogBox";
import EmotionContainer from "../../../components/emotion-container/EmotionContainer";
import Face from "../../../components/face/Face";
import { Emotions } from "../../../components/face/constants";
import FaceContainer from "../../emotion-select/FaceContainer";
import anime from "animejs";
import { memo, useMemo, useRef, useState } from "react";
import "./sad-activity.scss";
import { getRandomBetween } from "../../../utils/random";
import Teardrop from "../../../components/face/assets/Teardrop";
import wave from "../../../components/face/animations/wave";
import disperse from "../../../components/face/animations/disperse";
import NavBar from "../../../components/nav/NavBar";

const SadTears = memo(({ onClick }: { key: number; onClick?: () => void }) => {
  const id = useRef(Math.random() * 1000);
  const hp = useRef(3);
  const [visible, setVisible] = useState(true);
  const ref = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const bottom = useMemo(() => {
    return getRandomBetween(
      0,
      document.body.clientHeight - document.body.clientHeight * 0.1,
    );
  }, []);

  const left = useMemo(() => {
    return getRandomBetween(
      -document.body.clientWidth * 0.15,
      document.body.clientWidth - document.body.clientWidth * 0.25,
    );
  }, []);
  const animationDuration = useMemo(() => {
    return `${getRandomBetween(2500, 5000)}ms`;
  }, []);

  if (!visible) {
    return <></>;
  }
  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        left,
        bottom,
        zIndex: 100,
      }}
    >
      <Teardrop
        id={id.current}
        ref={ref}
        onClick={async () => {
          if (wrapperRef.current) {
            wave(wrapperRef.current)
              .then(() => {})
              .catch(() => {});
          }
          hp.current -= 1;
          if (hp.current <= 0) {
            anime({
              targets: wrapperRef.current,
              scale: [1, 0],
              duration: 250,
              easing: "easeInOutSine",
              complete: () => {
                if (wrapperRef.current) {
                  disperse(wrapperRef.current);
                }
                onClick?.();
                setVisible(false);
              },
            });
          } else {
            anime({
              targets: wrapperRef.current,
              scale: [1, 0.9, 1],

              duration: 200,
              easing: "easeInOutSine",
              direction: "alternate",
            });
          }
        }}
        className={"tear"}
        style={{
          animationDuration,
        }}
      />
    </div>
  );
});

function getTextByScore(score: number) {
  if (score < 3) {
    return "Help me dry my tears...";
  } else if (score < 4) {
    return "I'm starting to feel much better.";
  } else if (score === 4) {
    return "Almost done!";
  }
  return "I'm feeling much better, thank you.";
}

export default function SadActivity() {
  const tears = [0, 1, 2, 3, 4];
  const [gameOver, setGameOver] = useState(false);
  const [text, setText] = useState("Help me dry my tears...");
  const score = useRef(0);

  const removeTear = () => {
    score.current += 1;
    setText(getTextByScore(score.current) ?? "");
    if (score.current >= tears.length) {
      setTimeout(() => {
        setGameOver(true);
      }, 1000);
    }
  };

  const renderTears = useMemo(() => {
    if (gameOver) {
      return [];
    }
    return tears.map((key) => <SadTears key={key} onClick={removeTear} />);
  }, [gameOver]);
  const emotion = gameOver ? Emotions.happy : Emotions.sad;

  return (
    <EmotionContainer emotion={emotion}>
      {renderTears}
      <NavBar />

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
        <Link to={"/"}>
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
            I'm still sad.
          </AnimatedButton>
        )}
      </div>
    </EmotionContainer>
  );
}
