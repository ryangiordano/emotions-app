import { useQuery } from "react-query";
import EmotionBackground from "../../components/emotion-container/EmotionBackground";
import { Emotions } from "../../components/face/constants";
import { getUsers } from "../../services/firebase/user-service";
import { db } from "../../services/firebase";
import LoadingPage from "../../utils/loading-page/LoadingPage";
import { useState } from "react";
import UserCreateModal from "../modals/UserCreateModal";
import NavBar from "../../components/nav/NavBar";

function UserSquare({
  children,
  active,
  ...rest
}: { active?: boolean } & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      style={{
        width: "100%",
        borderRadius: "5px",
        border: "5px solid white",
        background: active ? "white" : "transparent",
        fontSize: "20px",
        color: active ? "rgba( 0, 0, 0, 0.3 )" : "white",
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export default function AccountInfoPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: "users",
    queryFn: () => {
      return getUsers(db);
    },
  });
  console.log(data);
  const loading = isLoading || isFetching;
  const users = data?.map((doc: any) => doc.data());
  return (
    <EmotionBackground emotion={loading ? Emotions.sad : Emotions.happy}>
      <NavBar />

      <UserCreateModal
        onSuccess={() => {
          setModalOpen(false);
        }}
        onClose={() => {
          setModalOpen(false);
        }}
        isOpen={modalOpen}
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
            return (
              <UserSquare active={user.defaultUser}>{user.name}</UserSquare>
            );
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
