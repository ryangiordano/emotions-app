import { InputType } from "../../components/constants";

export default function InputSwitchButton({
  inputType,
  setInputType,
}: {
  inputType: InputType;
  setInputType: React.Dispatch<React.SetStateAction<InputType>>;
}) {
  return (
    <button
      style={{
        position: "absolute",
        bottom: 10,
        right: 10,
        zIndex: 100,
        background: "transparent",
        border: "2px solid white",
        borderRadius: "10px",
        color: "white",
        padding: ".5rem",
      }}
      onClick={() => {
        setInputType(
          inputType === InputType.buttons ? InputType.slider : InputType.buttons
        );
      }}
    >
      Switch
    </button>
  );
}
