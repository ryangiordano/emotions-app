import { useIdToken } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import { auth } from "../../services/firebase";
import History from "../../assets/icons/components/History";
import Config from "../../assets/icons/components/Config";
import Home from "../../assets/icons/components/Home";
import { useCurrentUser } from "../../services/local-storage/current-user";

export default function BottomNav({
  topAccessories,
}: {
  topAccessories?: JSX.Element;
}) {
  const [loggedInUser, loading] = useIdToken(auth);
  const { userId } = useCurrentUser();
  const getNavClassName = (navData: any) => {
    return navData.isActive ? "active ui-button" : "ui-button";
  };

  return (
    <nav
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        boxSizing: "border-box",
        padding: "16px",
      }}
    >
      <div>{topAccessories}</div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "15px",
          marginLeft: "15px",
          marginRight: "15px",
        }}
      >
        <NavLink
          to={"/"}
          className={getNavClassName}
          style={{
            height: "50px",
            width: "50px",
          }}
        >
          <Home fill="white" />
        </NavLink>
        {!loading && loggedInUser && (
          <NavLink
            to={`/user-info/${userId}`}
            className={getNavClassName}
            style={{
              height: "50px",
              width: "50px",
            }}
          >
            <History fill={"white"} />
          </NavLink>
        )}
        {!loading && loggedInUser && (
          <NavLink
            to={"/account-info"}
            className={getNavClassName}
            style={{
              height: "50px",
              width: "50px",
            }}
          >
            <Config fill={"white"} />
          </NavLink>
        )}

        {!loading && !loggedInUser && (
          <NavLink to={"/login"} className={getNavClassName}>
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}
