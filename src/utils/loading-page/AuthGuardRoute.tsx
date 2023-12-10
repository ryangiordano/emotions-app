import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "./LoadingPage";

export default function AuthGuardRoute({
  unAuthenticatedOnly,
}: {
  unAuthenticatedOnly?: boolean;
}) {
  const [loggedInUser, loading] = useIdToken(auth);

  if (loading) {
    return <LoadingPage />;
  }
  const allow = unAuthenticatedOnly ? !loggedInUser : loggedInUser;
  return allow ? <Outlet /> : <Navigate to="/login" />;
}
