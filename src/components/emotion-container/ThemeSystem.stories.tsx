import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import EmotionContainer from "./EmotionContainer";
import { Emotions } from "../face/constants";
import {
  calmBackground,
  calmThemeStyle,
  emotionBackgroundMap,
  getCalmingBackground,
  getCalmingThemeStyle,
} from "../constants";
import DialogBox from "../dialog-box/DialogBox";
import AnimatedButton from "../buttons/AnimatedButton";
import "../buttons/button.scss";
import "../buttons/animated-button.scss";
import "../dialog-box/dialog-box.scss";
import "./emotion-container.scss";
import "../../pages/emotion-journal/emotion-journal.scss";

const PHONE_W = 414;
const PHONE_H = 896;

function ThemeSnapshot({
  emotion,
  progress,
  label,
}: {
  emotion: Emotions;
  progress: number;
  label: string;
}) {
  const isCalming = progress > 0;
  const backgroundOverride = isCalming
    ? getCalmingBackground(emotion, progress)
    : undefined;
  const themeStyle = isCalming ? getCalmingThemeStyle(progress) : undefined;

  return (
    <div style={{ display: "inline-block", marginRight: "24px", marginBottom: "24px", verticalAlign: "top" }}>
      <p style={{ color: "#333", marginBottom: "8px", fontWeight: "bold", fontSize: "14px" }}>
        {label}
      </p>
      <div style={{ width: PHONE_W, height: PHONE_H, overflow: "hidden", border: "1px solid #ccc", borderRadius: "8px" }}>
        <EmotionContainer
          emotion={emotion}
          backgroundOverride={backgroundOverride}
          themeStyle={themeStyle}
        >
          <DialogBox
            emotion={emotion}
            text="Tell me about what you're feeling..."
            backgroundOverride={backgroundOverride}
          />

          <div style={{ padding: "16px" }}>
            <textarea
              className="journal-textarea emotion-journal"
              placeholder="Today I'm feeling..."
              style={{ width: "100%", height: "100px" }}
              readOnly
            />
          </div>

          <div style={{ padding: "0 16px 16px" }}>
            <AnimatedButton background={backgroundOverride ?? emotionBackgroundMap[emotion]}>
              Submit
            </AnimatedButton>
          </div>

          <nav style={{ display: "flex", gap: "10px", padding: "0 16px 16px" }}>
            <button className="ui-button" style={{ padding: "8px 16px" }}>Home</button>
            <button className="ui-button" style={{ padding: "8px 16px" }}>History</button>
            <button className="ui-button" style={{ padding: "8px 16px" }}>Config</button>
          </nav>
        </EmotionContainer>
      </div>
    </div>
  );
}

function InteractiveSlider({ emotion }: { emotion: Emotions }) {
  const [progress, setProgress] = useState(0);
  const backgroundOverride = progress > 0
    ? getCalmingBackground(emotion, progress)
    : undefined;
  const themeStyle = progress > 0 ? getCalmingThemeStyle(progress) : undefined;

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <label style={{ color: "#333", fontWeight: "bold", fontSize: "14px" }}>
          Calming progress: {Math.round(progress * 100)}%
        </label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          style={{ display: "block", width: PHONE_W, marginTop: "8px" }}
        />
      </div>
      <div style={{ width: PHONE_W, height: PHONE_H, overflow: "hidden", border: "1px solid #ccc", borderRadius: "8px" }}>
        <EmotionContainer
          emotion={emotion}
          backgroundOverride={backgroundOverride}
          themeStyle={themeStyle}
        >
          <DialogBox
            emotion={emotion}
            text="Tell me about what you're feeling..."
            backgroundOverride={backgroundOverride}
          />

          <div style={{ padding: "16px" }}>
            <textarea
              className="journal-textarea emotion-journal"
              placeholder="Today I'm feeling..."
              style={{ width: "100%", height: "100px" }}
              readOnly
            />
          </div>

          <div style={{ padding: "0 16px 16px" }}>
            <AnimatedButton background={backgroundOverride ?? emotionBackgroundMap[emotion]}>
              Submit
            </AnimatedButton>
          </div>

          <nav style={{ display: "flex", gap: "10px", padding: "0 16px 16px" }}>
            <button className="ui-button" style={{ padding: "8px 16px" }}>Home</button>
            <button className="ui-button" style={{ padding: "8px 16px" }}>History</button>
            <button className="ui-button" style={{ padding: "8px 16px" }}>Config</button>
          </nav>
        </EmotionContainer>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Theme/Color Schemes",
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const HappySnapshot: StoryObj = {
  name: "Happy (no calming)",
  render: () => (
    <ThemeSnapshot emotion={Emotions.happy} progress={0} label="Happy — Always white theme" />
  ),
};

export const CheckinSnapshot: StoryObj = {
  name: "Check-in Page",
  render: () => (
    <div style={{ display: "inline-block" }}>
      <p style={{ color: "#333", marginBottom: "8px", fontWeight: "bold", fontSize: "14px" }}>
        Check-in Page (fully calmed)
      </p>
      <div style={{ width: PHONE_W, height: PHONE_H, overflow: "hidden", border: "1px solid #ccc", borderRadius: "8px" }}>
        <EmotionContainer
          emotion={Emotions.neutral}
          backgroundOverride={calmBackground}
          themeStyle={calmThemeStyle}
        >
          <DialogBox
            emotion={Emotions.neutral}
            text="How are you feeling now?"
            backgroundOverride={calmBackground}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "16px" }}>
            <AnimatedButton background="linear-gradient(to bottom, #00e67b, #00b3e6)">Better</AnimatedButton>
            <AnimatedButton background="linear-gradient(to bottom, #999, #bbb)">Same</AnimatedButton>
            <AnimatedButton background="linear-gradient(to bottom, #EB3E3E, #F4D18D)">Worse</AnimatedButton>
          </div>
          <nav style={{ display: "flex", gap: "10px", padding: "0 16px 16px" }}>
            <button className="ui-button" style={{ padding: "8px 16px" }}>Home</button>
            <button className="ui-button" style={{ padding: "8px 16px" }}>History</button>
          </nav>
        </EmotionContainer>
      </div>
    </div>
  ),
};

export const InteractiveAngry: StoryObj = {
  name: "Interactive — Angry",
  render: () => <InteractiveSlider emotion={Emotions.angry} />,
};

export const InteractiveSad: StoryObj = {
  name: "Interactive — Sad",
  render: () => <InteractiveSlider emotion={Emotions.sad} />,
};

export const InteractiveAnxious: StoryObj = {
  name: "Interactive — Anxious",
  render: () => <InteractiveSlider emotion={Emotions.anxious} />,
};
