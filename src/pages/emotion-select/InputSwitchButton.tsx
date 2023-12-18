import UIButton from "../../components/buttons/Button";
import { InputType } from "../../components/constants";

export default function InputSwitchButton({
  inputType,
  setInputType,
}: {
  inputType: InputType;
  setInputType: React.Dispatch<React.SetStateAction<InputType>>;
}) {
  return (
    <UIButton
      onClick={() => {
        setInputType(
          inputType === InputType.buttons ? InputType.slider : InputType.buttons
        );
      }}
    >
      Switch
    </UIButton>
  );
}
