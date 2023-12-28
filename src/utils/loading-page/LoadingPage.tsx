import "./LoadingPage.scss";

export default function LoadingPage({ full = true }: { full?: boolean }) {
  return (
    <div
      style={{ height: full ? "100vh" : undefined }}
      className="loading-page-container"
    >
      <span className="loader"></span>
    </div>
  );
}
