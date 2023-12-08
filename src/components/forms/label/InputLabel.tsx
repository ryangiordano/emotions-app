import "./input-label.scss";

export default function InputLabel({
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>) {
  return <label className={`ui-label ${className ?? ""}`} {...rest}></label>;
}
