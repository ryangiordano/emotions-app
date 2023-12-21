import "./text-input.scss";

export default function Select({
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>) {
  return (
    <select
      className={`ui-select ${className ?? ""}`}
      style={{
        fontSize: 20,
        height: "3.5rem",
        width: "100%",
        borderRadius: "10px",
      }}
      {...rest}
    />
  );
}
