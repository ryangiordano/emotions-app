import "./button.scss";

export default function UIButton({
  children,
  style,
  ...rest
}: {
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button style={style} className="ui-button" {...rest}>
      {children}
    </button>
  );
}
