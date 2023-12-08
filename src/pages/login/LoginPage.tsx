import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser as deleteFirebaseUser,
  signOut,
  User,
} from "firebase/auth";
import { useIdToken } from "react-firebase-hooks/auth";
import firebaseApp from "../../services/firebase";
import { Emotions } from "../../components/face/constants";
import EmotionBackground from "../../components/emotion-container/EmotionBackground";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UIButton from "../../components/buttons/Button";
import TextInput from "../../components/forms/inputs/TextInput";
import InputLabel from "../../components/forms/label/InputLabel";
import FormContainer from "../../components/forms/container/FormContainer";
import FormSection from "../../components/forms/container/FormSection";

const auth = getAuth(firebaseApp);

const login = (username: string, password: string) => {
  return signInWithEmailAndPassword(auth, username, password);
};

// const deleteUser = (user: User) => {
//   deleteFirebaseUser(user);
// };

// const logout = () => {
//   signOut(auth);
// };

function LoginPage() {
  const [user, loading, error] = useIdToken(auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <EmotionBackground emotion={Emotions.happy}>
      <FormContainer>
        <h1>Login</h1>

        <FormSection>
          <InputLabel htmlFor="username">Email</InputLabel>

          <TextInput
            id="username"
            className="ui-input"
            style={{
              fontSize: 20,
              height: "3.5rem",
              width: "100%",
              marginBottom: 20,
              borderRadius: "10px",
            }}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormSection>
        <FormSection>
          <InputLabel>Password</InputLabel>
          <TextInput
            id="password"
            className="ui-input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormSection>

        <div className="form-button-container">
          <UIButton
            disabled={!username.length || !password.length}
            style={{ fontSize: 20 }}
            onClick={() => {
              login(username, password).then((user) => {
                // Set global store with user

                console.log(user);
              });
            }}
          >
            Log in
          </UIButton>
          {/* Nav to new user */}
          <Link to={"/create-user"}>
            <UIButton style={{ fontSize: 20 }}>Create Account</UIButton>
          </Link>
        </div>
      </FormContainer>
    </EmotionBackground>
  );

  return <></>;
}

export default LoginPage;
