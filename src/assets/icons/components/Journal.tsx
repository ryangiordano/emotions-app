export default function Journal({
  stroke,
  size,
}: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 95 142" fill="none">
      <rect
        x="2.5"
        y="2.5"
        width="90"
        height="101"
        rx="4.5"
        stroke={stroke}
        stroke-width="5"
      />
      <path
        d="M3 102V116C3 119.866 6.13401 123 10 123H51"
        stroke={stroke}
        stroke-width="5"
      />
      <path
        d="M50.5 113V135.5L61 125L71.5 135.5V113H13.5"
        stroke={stroke}
        stroke-width="5"
      />
      <path
        d="M92 125.5C93.3807 125.5 94.5 124.381 94.5 123C94.5 121.619 93.3807 120.5 92 120.5V125.5ZM74 125.5H92V120.5H74V125.5Z"
        fill={stroke}
      />
      <path
        d="M88 115.5C89.3807 115.5 90.5 114.381 90.5 113C90.5 111.619 89.3807 110.5 88 110.5V115.5ZM74 115.5H88V110.5H74V115.5Z"
        fill={stroke}
      />
      <rect
        x="21.5"
        y="22.5"
        width="53"
        height="42"
        rx="4.5"
        stroke={stroke}
        stroke-width="5"
      />
    </svg>
  );
}
