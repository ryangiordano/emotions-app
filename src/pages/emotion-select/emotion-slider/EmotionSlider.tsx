import ReactSlider from "react-slider";
import { Emotions } from "../../../components/face/constants";
import { emotionColorMap, emotionIconMap } from "../../../components/constants";
import "./emotion-slider.scss";

const getEmotionFromSlider = (sliderValue: number) => {
  if (sliderValue < 25) {
    return Emotions.happy;
  }
  if (sliderValue < 50) {
    return Emotions.angry;
  }
  if (sliderValue < 75) {
    return Emotions.sad;
  }
  return Emotions.anxious;
};

export default function EmotionSlider({
  sliderValue,
  setEmotionSliderValue,
  selectedEmotion,
  updateEmotion,
}: {
  sliderValue: number;
  setEmotionSliderValue: (value: number) => void;
  selectedEmotion?: Emotions;
  updateEmotion: (emotion: Emotions) => void;
}) {
  return (
    <ReactSlider
      className="horizontal-slider"
      withTracks
      value={sliderValue}
      markClassName="emotion-mark"
      marks={[20, 45, 70, 95]}
      min={0}
      max={100}
      thumbClassName="emotion-thumb"
      trackClassName="emotion-track"
      onChange={(value: number) => {
        console.log(value);
        setEmotionSliderValue(value);
        const emotion = getEmotionFromSlider(value);

        if (selectedEmotion === undefined || emotion !== selectedEmotion) {
          updateEmotion(getEmotionFromSlider(value));
        }
      }}
      renderThumb={(props, state) => (
        <div
          {...props}
          className={[
            emotionColorMap[getEmotionFromSlider(state.valueNow)],
            "emotion-select-thumb",
            props.className,
          ].join(" ")}
        >
          {emotionIconMap[getEmotionFromSlider(state.valueNow)]}
        </div>
      )}
    />
  );
}
