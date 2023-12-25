import { useQuery } from "react-query";
import EmotionBackground from "../../components/emotion-container/EmotionBackground";
import { Emotions } from "../../components/face/constants";
import { getUsers } from "../../services/firebase/user-service";
import { db } from "../../services/firebase";
import LoadingPage from "../../utils/loading-page/LoadingPage";
import { useState } from "react";
import UserCreateModal from "../modals/UserCreateModal";
import NavBar from "../../components/nav/NavBar";
import { Link } from "react-router-dom";

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
        border: "2px solid white",
        background: active ? "white" : "transparent",
        fontSize: "20px",
        padding: "15px",
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
  const loading = isLoading || isFetching;
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
          {data?.docs.map((doc: any) => {
            const user = doc.data();
            return (
              <Link to={`/user-info/${doc.id}`} key={doc.id}>
                <UserSquare>{user.name}</UserSquare>
              </Link>
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
