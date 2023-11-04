import "./dialog-box.scss";
export default function DialogBox({ text }: { text?: string }) {
  return <div className="dialog-box">{text}</div>;
}
