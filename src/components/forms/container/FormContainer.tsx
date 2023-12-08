import "./form-container.scss";

export default function FormComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <form className="form-container">{children}</form>;
}
