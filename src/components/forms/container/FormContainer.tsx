import "./form-container.scss";

export default function FormComponent({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>) {
  return (
    <form className={`form-container ${className}`} {...props}>
      {children}
    </form>
  );
}
