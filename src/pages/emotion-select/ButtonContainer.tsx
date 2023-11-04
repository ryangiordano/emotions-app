import "./emotion-select.scss";

export default function ButtonContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="button-container">{children}</div>;
}
