import "./face-container.scss";

export default function FaceContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="face-container-wrapper">
      <div className="face-container">{children}</div>
    </div>
  );
}
