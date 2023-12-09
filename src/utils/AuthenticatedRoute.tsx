import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "./loading-page/LoadingPage";

export default function AuthenticatedRoute() {
  const [loggedInUser, loading] = useIdToken(auth);

  if (loading) {
    return <LoadingPage />;
  }
  return loggedInUser ? <Outlet /> : <Navigate to="/login" />;
}
