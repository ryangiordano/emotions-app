import Journal from "../../../assets/icons/components/Journal";

export default function JournalButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ height: "50px", width: "50px" }}>
      <Journal fill="white" stroke="white" />
    </button>
  );
}
