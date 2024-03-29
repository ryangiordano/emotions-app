import { useState } from "react";
import FormContainer from "../../components/forms/container/FormContainer";
import Modal from "../../components/modal/Modal";
import { db } from "../../services/firebase";
import { createUser } from "../../services/firebase/user-service";
import FormSection from "../../components/forms/container/FormSection";
import TextInput from "../../components/forms/inputs/TextInput";
import InputLabel from "../../components/forms/label/InputLabel";
import UIButton from "../../components/buttons/Button";
import { emotionBackgroundMap } from "../../components/constants";
import { errorToast } from "../../components/toasts";

export default function UserCreateModal({
  isOpen,
  onSuccess,
  onClose,
}: {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [username, setUsername] = useState("");
  return (
    <Modal
      header={"Add User"}
      open={isOpen}
      onClose={onClose}
      animatePresence="flip-in-x"
      backgroundColor={emotionBackgroundMap.anxious}
    >
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          createUser(db, { username })
            .then((docRef) => {
              if (docRef.id) {
                setUsername("");
                onClose();
                onSuccess();
              }
            })
            .catch(() => {
              setUsername("");
              errorToast();
            });
        }}
      >
        <FormSection>
          <InputLabel htmlFor="username">Name</InputLabel>

          <TextInput
            id="username"
            className="ui-input"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </FormSection>
        <UIButton
          type="submit"
          disabled={!username.length}
          style={{ width: "100%" }}
        >
          Create
        </UIButton>
      </FormContainer>
    </Modal>
  );
}
