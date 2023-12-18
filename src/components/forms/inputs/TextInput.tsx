import "./text-input.scss";

export default function TextInput({
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return (
    <input
      className={`ui-text-input ${className ?? ""}`}
      style={{
        fontSize: 20,
        height: "3.5rem",
        width: "100%",
        marginBottom: 20,
        borderRadius: "10px",
        border: "none",
      }}
      {...rest}
    />
  );
}
