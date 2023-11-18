import "./emotion-select.scss";
export default function EmotionSelectButton({
  onClick,
  children,
  selected,
  ...rest
}: {
  onClick?: () => void;
  children: React.ReactNode;
  selected?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>) {
  const { className } = rest;

  return (
    <button
      className={[
        "button",
        "emotion-select-button",
        className,
        selected ? "selected" : "",
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
