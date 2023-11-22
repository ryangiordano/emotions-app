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
          <stop stopColor="#FFEA30" />
          <stop offset="1" stopColor="white" stopOpacity="0.08" />
        </radialGradient>
        <radialGradient
          id={`${id}-2`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(80.0001 80) rotate(90) scale(55.8491)"
        >
          <stop stopColor="#FF7A30" />
          <stop offset="1" stopColor="#FAF348" stopOpacity="0.39" />
        </radialGradient>
        <radialGradient
          id={`${id}-3`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(80 80) rotate(90) scale(24.6541)"
        >
          <stop stopColor="white" />
          <stop offset="0.46875" stopColor="#F49F4F" stopOpacity="0.53125" />
          <stop offset="1" stopColor="#FFF500" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
});

export default Fireball;
