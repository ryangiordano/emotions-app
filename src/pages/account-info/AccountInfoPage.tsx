import { useQuery } from "react-query";
import EmotionBackground from "../../components/emotion-container/EmotionBackground";
import { Emotions } from "../../components/face/constants";
import { createUser, getUsers } from "../../services/firebase/user-service";
import { db } from "../../services/firebase";
import LoadingPage from "../../utils/loading-page/LoadingPage";
import { useState } from "react";
import Modal from "../../components/modal/Modal";
import FormContainer from "../../components/forms/container/FormContainer";
import UserCreateModal from "./UserCreateModal";
import NavBar from "../../components/nav/NavBar";

function UserSquare({
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      style={{
        width: "100%",
        borderRadius: "5px",
        border: "5px solid white",
        background: "transparent",
        fontSize: "20px",
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export default function AccountInfoPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading, isFetching, refetch } = useQuery("user", () => {
    return getUsers(db);
  });
  const loading = isLoading || isFetching;
  const users = data?.map((doc: any) => doc.data());
  return (
    <EmotionBackground emotion={loading ? Emotions.sad : Emotions.happy}>
      <NavBar />

      <UserCreateModal
        isOpen={modalOpen}
        onSuccess={() => {
          setModalOpen(false);
        }}
        onClose={() => {
          setModalOpen(false);
        }}
      />
      {loading ? (
        <LoadingPage />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "500px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            gap: "10px",
          }}
        >
          {users?.map((user: any) => {
            return <UserSquare>{user.name}</UserSquare>;
          })}
          <UserSquare
            onClick={() => {
              setModalOpen(true);
            }}
          >
            +
          </UserSquare>
        </div>
      )}
    </EmotionBackground>
  );
}
