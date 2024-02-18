import { useEffect } from "react";
import { eyeBlink } from "./animations/eye-blink";
import { hover } from "./animations/idle";
import { transitionInUp } from "./animations/transition";
import "./face.scss";

export default function HappyFace({
  talkDuration,
  onFinishTalk,
}: {
  talkDuration?: number;
  onFinishTalk?: () => void;
}) {
  useEffect(() => {
    const eye = document.querySelectorAll(".eye");
    const body = document.querySelectorAll("#neutral-face> *");
    const face = document.querySelectorAll(".face");
    transitionInUp(body, () => {
      hover(face);
      eyeBlink(eye);
    });
  }, []);

  return (
    <svg
      className="face"
      width="200"
      height="200"
      viewBox="0 0 400 400"
      fill="none"
      id="neutral-face"
    >
      <circle
        cx="200"
        cy="200"
        r="198"
        fill="url(#paint0_linear_393_11)"
        stroke="white"
        strokeWidth="4"
      />
      <ellipse
        className="eye"
        cx="95.302"
        cy="131.544"
        rx="14.7651"
        ry="16.1074"
        fill="white"
        style={{ transformOrigin: "center 35%", position: "absolute" }}
      />
      <ellipse
        className="eye"
        cx="304.698"
        cy="131.544"
        rx="14.7651"
        ry="16.1074"
        fill="white"
        style={{ transformOrigin: "center 35%" }}
      />
      <path
        className="mouth"
        d="M150 174C150 203.823 174.177 228 200 228C233.823 228 258 203.823 258 174"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_393_11"
          x1="200"
          y1="0"
          x2="200"
          y2="400"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D9D9D9" stopOpacity="0" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
