import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import UIButton from "../buttons/Button";
import { NavLink } from "react-router-dom";

export default function NavBar({
  extraActions,
}: {
  extraActions?: JSX.Element;
}) {
  const [loggedInUser, loading] = useIdToken(auth);
  const getNavClassName = (navData: any) => {
    return navData.isActive ? "active ui-button" : "ui-button";
  };
  return (
    <nav style={{ marginBottom: "10px", display: "flex", gap: "5px" }}>
      <NavLink
        to={"/"}
        className={getNavClassName}
        // refactor the above class name
      >
        Home
      </NavLink>
      {!loading && loggedInUser && (
        <NavLink to={"/account-info"} className={getNavClassName}>
          Account
        </NavLink>
      )}
      {!loading && loggedInUser && (
        <UIButton
          onClick={() => {
            auth.signOut();
          }}
        >
          Logout
        </UIButton>
      )}
      {!loading && !loggedInUser && (
        <NavLink to={"/login"} className={getNavClassName}>
          Login
        </NavLink>
      )}
      {extraActions}
    </nav>
  );
}
