import UIButton from "../buttons/Button";
import NavModal from "../../pages/modals/nav/NavModal";
import { useState } from "react";

export default function NavBar({
  extraActions,
}: {
  extraActions?: JSX.Element;
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <nav style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <UIButton
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          <img
            style={{ height: "30px" }}
            src="/src/components/face/SmallFace.svg"
          />
        </UIButton>
        {extraActions}
      </nav>
      <NavModal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
      />
    </>
  );
}
