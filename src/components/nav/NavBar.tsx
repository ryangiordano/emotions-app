import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import UIButton from "../buttons/Button";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [loggedInUser, loading] = useIdToken(auth);

  return (
    <nav style={{ marginBottom: "10px", display: "flex", gap: "5px" }}>
      {!loading && loggedInUser && (
        <Link to={"/user-info"}>
          <UIButton>Account</UIButton>
        </Link>
      )}
      {!loading && loggedInUser ? (
        <UIButton
          onClick={() => {
            auth.signOut();
          }}
        >
          Logout
        </UIButton>
      ) : (
        <Link to={"/login"}>
          <UIButton>Login</UIButton>
        </Link>
      )}
    </nav>
  );
}
