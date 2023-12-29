export default function Home({ fill }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 105 105" fill="none">
      <path
        d="M52.5001 101.912C25.2107 101.912 3.08833 79.7894 3.08833 52.5C3.08833 25.2107 25.2107 3.08826 52.5001 3.08826C79.7895 3.08826 101.912 25.2107 101.912 52.5C101.912 79.7894 79.7895 101.912 52.5001 101.912Z"
        fill="url(#paint0_linear_0_1)"
        stroke={fill}
        strokeWidth="5"
      />
      <path
        d="M79.522 38.603C77.39 38.603 75.6617 36.529 75.6617 33.9706C75.6617 31.4122 77.39 29.3383 79.522 29.3383C81.654 29.3383 83.3823 31.4122 83.3823 33.9706C83.3823 36.529 81.654 38.603 79.522 38.603Z"
        fill={fill}
      />
      <path
        d="M25.478 38.603C23.346 38.603 21.6177 36.529 21.6177 33.9706C21.6177 31.4122 23.346 29.3383 25.478 29.3383C27.6099 29.3383 29.3383 31.4122 29.3383 33.9706C29.3383 36.529 27.6099 38.603 25.478 38.603Z"
        fill={fill}
      />
      <path
        d="M38.6029 44.7794C38.6029 52.4546 44.8248 58.6765 52.5 58.6765C60.1752 58.6765 66.397 52.4546 66.397 44.7794"
        stroke={fill}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_0_1"
          x1="52.5001"
          y1="2.14577e-05"
          x2="52.5001"
          y2="105"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D9D9D9" stopOpacity="0" />
          <stop offset="1" stopColor={fill} stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
