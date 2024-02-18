import { useEffect } from "react";
import { eyeBlink } from "./animations/eye-blink";
import { shake } from "./animations/idle";
import { transitionInUp } from "./animations/transition";
import "./face.scss";

export default function AngryFace() {
  useEffect(() => {
    const eye = document.querySelectorAll(".eye");
    const body = document.querySelectorAll("#angry-face> *");
    const face = document.querySelectorAll(".face");
    transitionInUp(body, () => {
      shake(face);
      eyeBlink(eye);
    });
  }, []);

  // useEffect(() => {
  //   const mouth = document.querySelectorAll(".mouth");

  //   happyTalk(mouth, talkDuration, onFinishTalk);
  // }, [talkDuration, onFinishTalk]);
  return (
    <svg
      className="face"
      width="200"
      height="200"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="angry-face"
    >
      <circle
        cx="200"
        cy="200"
        r="198"
        fill="url(#paint0_linear_326_22)"
        stroke="white"
        strokeWidth="4"
      />
      <ellipse
        className="eye"
        cx="95.1351"
        cy="130.811"
        rx="15.1351"
        ry="16.2162"
        fill="white"
        style={{ transformOrigin: "center 35%" }}
      />
      <ellipse
        cx="42.1621"
        cy="166.487"
        rx="20.5405"
        ry="10.8108"
        fill="white"
      />
      <ellipse
        cx="362.162"
        cy="163.243"
        rx="20.5405"
        ry="9.72973"
        fill="white"
      />
      <ellipse
        className="eye"
        cx="304.865"
        cy="130.811"
        rx="15.1351"
        ry="16.2162"
        fill="white"
        style={{ transformOrigin: "center 35%" }}
      />
      <path
        d="M147.027 222.703C147.027 194.044 170.26 170.811 198.919 170.811C227.578 170.811 250.811 194.044 250.811 222.703"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M147.027 222.703C147.027 208.373 170.26 196.757 198.919 196.757C227.578 196.757 250.811 208.373 250.811 222.703"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M58.3784 88.6486L134.054 123.243"
        stroke="white"
        strokeWidth="4"
      />
      <path
        d="M341.622 88.6486L265.946 123.243"
        stroke="white"
        strokeWidth="4"
      />
      <defs>
        <linearGradient
          id="paint0_linear_326_22"
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
