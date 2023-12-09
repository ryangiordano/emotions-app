import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthenticatedRoute() {
  const [loggedInUser] = useIdToken(auth);
  return loggedInUser ? <Outlet /> : <Navigate to="/login" />;
}
