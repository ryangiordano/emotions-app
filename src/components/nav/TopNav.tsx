export default function TopNav({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {children}
    </div>
  );
}
