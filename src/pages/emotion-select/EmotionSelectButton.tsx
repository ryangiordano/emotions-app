import "./emotion-select.scss";
export default function EmotionSelectButton({
  onClick,
  children,
  ...rest
}: {
  onClick?: () => void;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>) {
  const { className } = rest;
  return (
    <button
      className={["emotion-select-button", className].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
