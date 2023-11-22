import { forwardRef } from "react";

const Teardrop = forwardRef<SVGSVGElement, any>(({ id, ...rest }, ref) => {
  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
      {...rest}
      ref={ref}
    >
      <circle
        cx="80"
        cy="80"
        r="80"
        fill={`url(#${id}-1)`}
        className="large-circle"
      />
      <circle
        cx="80.0001"
        cy="80"
        r="55.8491"
        fill={`url(#${id}-2)`}
        className="mid-circle"
      />
      <circle
        cx="110.189"
        cy="49.8113"
        r="24.6541"
        fill={`url(#${id}-3)`}
        className="small-circle"
      />
      <defs>
        <radialGradient
          id={`${id}-1`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(80 80) rotate(90) scale(80)"
        >
          <stop stop-color="#AA8DFD" />
          <stop offset="1" stop-color="white" stop-opacity="0.08" />
        </radialGradient>
        <radialGradient
          id={`${id}-2`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(80.0001 80) rotate(90) scale(55.8491)"
        >
          <stop stop-color="#95A4DB" />
          <stop offset="1" stop-color="#C1FEFA" stop-opacity="0.39" />
        </radialGradient>
        <radialGradient
          id={`${id}-3`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(110.189 49.8113) rotate(90) scale(24.6541)"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="#ADE3D6" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
});

export default Teardrop;
