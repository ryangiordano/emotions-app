import "./emotion-container.scss";

export default function EmotionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={"emotion-container"}>{children}</div>;
}
