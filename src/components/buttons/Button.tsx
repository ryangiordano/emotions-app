import "./button.scss";

export default function UIButton({
  children,
  style,
  className,
  ...rest
}: {
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button style={style} className={`ui-button ${className}`} {...rest}>
      {children}
    </button>
  );
}
