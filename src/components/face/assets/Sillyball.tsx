export default function Sillyball() {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
      <circle
        cx="80"
        cy="80"
        r="80"
        fill="url(#paint0_radial_348_48)"
        className="large-circle"
      />
      <circle
        cx="80.0001"
        cy="80"
        r="55.8491"
        className="mid-circle"
        fill="url(#paint1_radial_348_48)"
      />
      <circle
        cx="80"
        cy="80"
        r="24.6541"
        fill="url(#paint2_radial_348_48)"
        className="small-circle"
      />
      <defs>
        <radialGradient
          id="paint0_radial_348_48"
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
          id="paint1_radial_348_48"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(80.0001 80) rotate(90) scale(55.8491)"
        >
          <stop stopColor="#4DFF30" />
          <stop offset="1" stopColor="#FAF348" stopOpacity="0.39" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_348_48"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(80 80) rotate(90) scale(24.6541)"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#93F4C5" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
