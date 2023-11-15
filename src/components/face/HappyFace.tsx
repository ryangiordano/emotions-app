import { useEffect } from "react";
import { eyeBlink } from "./animations/eye-blink";
import { happyTalk } from "./animations/talk";
import { hover } from "./animations/hover";
import { transitionInUp } from "./animations/transition";
import "./face-container.scss";

export default function HappyFace({
  talkDuration,
  onFinishTalk,
}: {
  talkDuration: number;
  onFinishTalk: () => void;
}) {
  useEffect(() => {
    const eye = document.querySelectorAll(".eye");
    const body = document.querySelectorAll("#happy-face> *");
    const face = document.querySelectorAll(".face");
    transitionInUp(body, () => {
      hover(face);
      eyeBlink(eye);
    });
  }, []);

  useEffect(() => {
    const mouth = document.querySelectorAll(".mouth");

    happyTalk(mouth, talkDuration, onFinishTalk);
  }, [talkDuration, onFinishTalk]);

  return (
    <svg
      className="face"
      width="400"
      height="400"
      viewBox="0 0 400 400"
      fill="none"
      id="happy-face"
    >
      <circle
        cx="200"
        cy="200"
        r="198"
        fill="url(#paint0_linear_326_53)"
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
        cx="41.6107"
        cy="166.443"
        rx="20.1342"
        ry="10.7383"
        fill="white"
      />
      <ellipse
        cx="362.416"
        cy="162.416"
        rx="21.4765"
        ry="9.39597"
        fill="white"
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
        d="M139.597 171.812L257.718 171.812"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M249.664 171.812C249.664 199.982 226.828 222.819 198.658 222.819C170.487 222.819 147.651 199.982 147.651 171.812"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
        className="mouth"
        style={{ transformOrigin: "center 45%" }}
      />
      <path
        d="M61.745 115.436C61.745 99.1271 74.9661 85.906 91.2752 85.906C107.584 85.906 120.805 99.1271 120.805 115.436"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M271.141 110.067C271.141 95.2407 284.362 83.2215 300.671 83.2215C316.98 83.2215 330.201 95.2407 330.201 110.067"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_326_53"
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
