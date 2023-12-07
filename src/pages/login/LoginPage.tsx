import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useIdToken } from "react-firebase-hooks/auth";
import firebaseApp from "../../services/firebase";

const auth = getAuth(firebaseApp);

const login = () => {
  signInWithEmailAndPassword(auth, "test@test.com", "password");
};

const logout = () => {
  signOut(auth);
};

const LoginPage = () => {
  const [user, loading, error] = useIdToken(auth);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }
  return <button onClick={login}>Log in</button>;
};

export default LoginPage;
