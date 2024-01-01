import LeftChevron from "../../../assets/icons/components/LeftChevron";

export default function BackButton({
  ...rest
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      {...rest}
      style={{
        height: "25px",
        width: "50px",
      }}
    >
      <LeftChevron fill="white" />
    </button>
  );
}
