import { useQuery } from "react-query";
import EmotionBackground from "../../components/emotion-container/EmotionBackground";
import { Emotions } from "../../components/face/constants";
import { getUsers } from "../../services/firebase/user-service";
import { db } from "../../services/firebase";
import LoadingPage from "../../utils/loading-page/LoadingPage";
import { useState } from "react";
import UserCreateModal from "../modals/UserCreateModal";
import { Link, useNavigate } from "react-router-dom";
import BottomNav from "../../components/nav/BottomNav";
import UIButton from "../../components/buttons/Button";
import { auth } from "../../services/firebase";

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
  const navigate = useNavigate();
  return (
    <EmotionBackground emotion={loading ? Emotions.sad : Emotions.happy}>
      <UserCreateModal
        onSuccess={() => setModalOpen(false)}
        onClose={() => setModalOpen(false)}
        isOpen={modalOpen}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
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
            <UserSquare onClick={() => setModalOpen(true)}>+</UserSquare>
          </div>
        )}
        <UIButton
          className="red"
          style={{
            width: "100%",
            marginTop: "auto",
            marginBottom: "16px",
            color: "white",
          }}
          onClick={() => {
            auth.signOut().then(() => {
              navigate("/");
            });
          }}
        >
          Logout
        </UIButton>
      </div>

      <BottomNav />
    </EmotionBackground>
  );
}
