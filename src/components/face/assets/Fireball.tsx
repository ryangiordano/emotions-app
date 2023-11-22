import { forwardRef } from "react";

const Fireball = forwardRef<SVGSVGElement, any>(({ id, ...rest }, ref) => {
  return (
    <svg
      ref={ref}
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
      {...rest}
    >
      <circle
        cx="80"
        cy="80"
        r="80"
        className="large-circle"
        fill={`url(#${id}-1)`}
      />
      <circle
        cx="80.0001"
        cy="80"
        r="55.8491"
        className="mid-circle"
        fill={`url(#${id}-2)`}
      />
      <circle
        cx="80"
        cy="80"
        r="24.6541"
        className="small-circle"
        fill={`url(#${id}-3)`}
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
          <stop stop-color="#FFEA30" />
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
          <stop stop-color="#FF7A30" />
          <stop offset="1" stop-color="#FAF348" stop-opacity="0.39" />
        </radialGradient>
        <radialGradient
          id={`${id}-3`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(80 80) rotate(90) scale(24.6541)"
        >
          <stop stop-color="white" />
          <stop offset="0.46875" stop-color="#F49F4F" stop-opacity="0.53125" />
          <stop offset="1" stop-color="#FFF500" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
});

export default Fireball;
