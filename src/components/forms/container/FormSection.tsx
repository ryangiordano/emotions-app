export default function FormSection({
  children,
  ...rest
}: {
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div className="form-section" {...rest}>
      {children}
    </div>
  );
}
