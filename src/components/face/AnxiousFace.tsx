import { useEffect } from "react";
import { eyeBlink } from "./animations/eye-blink";
import { hover } from "./animations/hover";
import { transitionInUp } from "./animations/transition";
import "./face.scss";

export default function AnxiousFace() {
  useEffect(() => {
    const eye = document.querySelectorAll(".eye");
    const body = document.querySelectorAll("#anxious-face> *");
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
      id="anxious-face"
    >
      <circle
        cx="200"
        cy="200"
        r="198"
        fill="url(#paint0_linear_326_63)"
        stroke="white"
        strokeWidth="4"
      />
      <ellipse cx="60" cy="154.667" rx="20" ry="10.6667" fill="white" />
      <ellipse
        cx="349.333"
        cy="150.667"
        rx="18.6667"
        ry="9.33333"
        fill="white"
      />
      <path
        className="eye"
        style={{ transformOrigin: "center 35%" }}
        d="M80 93.3333L122.667 115.083L82.9942 141.333"
        stroke="white"
        strokeWidth="4"
      />
      <path
        className="eye"
        style={{ transformOrigin: "center 35%" }}
        d="M322.667 93.3333L282.667 115.083L319.86 141.333"
        stroke="white"
        strokeWidth="4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M131.367 199.66C143.175 199.66 152.748 209.233 152.748 221.041C152.748 235.058 164.111 246.421 178.128 246.421C192.145 246.421 203.508 235.058 203.508 221.041H199.508C199.508 232.848 189.936 242.421 178.128 242.421C166.32 242.421 156.748 232.848 156.748 221.041C156.748 207.023 145.385 195.66 131.367 195.66C117.35 195.66 105.987 207.023 105.987 221.041H109.987C109.987 209.233 119.559 199.66 131.367 199.66Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M226.396 199.66C238.204 199.66 247.776 209.233 247.776 221.041C247.776 235.058 259.139 246.421 273.157 246.421C287.174 246.421 298.537 235.058 298.537 221.041H294.537C294.537 232.848 284.965 242.421 273.157 242.421C261.349 242.421 251.776 232.848 251.776 221.041C251.776 207.023 240.413 195.66 226.396 195.66C212.379 195.66 201.016 207.023 201.016 221.041H205.016C205.016 209.233 214.588 199.66 226.396 199.66Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_326_63"
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
