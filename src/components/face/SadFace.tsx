import { useEffect } from "react";
import { eyeBlink } from "./animations/eye-blink";
import { hover } from "./animations/hover";
import { transitionInUp } from "./animations/transition";
import "./face.scss";

export default function SadFace() {
  useEffect(() => {
    const eye = document.querySelectorAll(".eye");
    const body = document.querySelectorAll("#sad-face> *");
    const face = document.querySelectorAll(".face");
    transitionInUp(body, () => {
      hover(face);
      eyeBlink(eye);
    });
  }, []);
  return (
    <svg
      className="face"
      width="400"
      height="400"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="sad-face"
    >
      <circle
        cx="200"
        cy="200"
        r="198"
        fill="url(#paint0_linear_326_75)"
        stroke="white"
        strokeWidth="4"
      />
      <ellipse
        className="eye"
        style={{ transformOrigin: "center 35%" }}
        cx="95.1351"
        cy="130.811"
        rx="15.1351"
        ry="16.2162"
        fill="white"
      />
      <ellipse
        cx="42.1623"
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
        style={{ transformOrigin: "center 35%" }}
        cx="304.865"
        cy="130.811"
        rx="15.1351"
        ry="16.2162"
        fill="white"
      />
      <path
        d="M147.027 222.703C147.027 194.044 170.26 170.811 198.919 170.811C227.578 170.811 250.811 194.044 250.811 222.703"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M267.563 91.7251C266.629 96.4095 283.435 103.707 305.101 108.025C326.766 112.342 345.086 112.045 346.02 107.361"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M132.511 90.8109C133.445 95.4953 116.638 102.793 94.9731 107.111C73.3078 111.428 54.9877 111.131 54.0542 106.446"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_326_75"
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
