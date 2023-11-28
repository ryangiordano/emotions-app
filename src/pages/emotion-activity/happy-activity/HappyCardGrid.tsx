import { useEffect, useState } from "react";
import { emotionBackgroundMap } from "../../../components/constants";
import { Emotions } from "../../../components/face/constants";
import "./happy-activity.scss";
import anime from "animejs";

export default function HappyCardGrid({
  array,
  onComplete,
}: {
  array: Emotions[];
  onComplete: () => void;
}) {
  const [selected, setSelected] = useState<number[]>([]);
  const [matches, setMatches] = useState<number[]>([]);
  const [intermission, setIntermission] = useState(false);
  useEffect(() => {
    if (matches.length === array.length) {
      const gridTiles = document.querySelectorAll(".grid-tile");
      anime({
        targets: gridTiles,
        scale: [1, 0],
        opacity: [1, 0],
        duration: 1000,
        delay: anime.stagger(100),
        easing: "easeInOutQuad",
        complete: () => {
          setTimeout(() => {
            onComplete();
          }, 2000);
        },
      });
    }
  }, [matches]);

  useEffect(() => {
    if (intermission) {
      setTimeout(() => {
        setIntermission(false);
        setSelected([]);
      }, 1000);
    }
  }, [intermission]);

  return (
    <div className="grid">
      {array.map((emotion, index) => {
        const isMatched = matches.includes(index);
        const isSelected = selected.includes(index);
        return (
          <button
            key={index}
            className={`button grid-tile ${isMatched ? "matched" : ""} ${
              isSelected ? "selected" : ""
            }`}
            style={{
              background:
                isMatched || isSelected
                  ? emotionBackgroundMap[emotion]
                  : undefined,
            }}
            disabled={matches.includes(index) || intermission}
            onClick={() => {
              setSelected([...selected, index]);

              if (selected.length === 1) {
                if (array[selected[0]] === emotion) {
                  setMatches([...matches, selected[0], index]);
                }
                setIntermission(true);
              }
            }}
          ></button>
        );
      })}
    </div>
  );
}
