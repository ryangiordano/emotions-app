import { Link } from "react-router-dom";
import UIButton from "../../components/buttons/Button";
import EmotionBackground from "../../components/emotion-container/EmotionBackground";
import { Emotions } from "../../components/face/constants";
import TextInput from "../../components/forms/inputs/TextInput";
import InputLabel from "../../components/forms/label/InputLabel";
import FormContainer from "../../components/forms/container/FormContainer";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../services/firebase";
import { useIdToken } from "react-firebase-hooks/auth";
import { useState } from "react";
import FormSection from "../../components/forms/container/FormSection";

const auth = getAuth(firebaseApp);

const createUser = (username: string, password: string) => {
  return createUserWithEmailAndPassword(auth, username, password);
};

export default function CreateUserPage() {
  const [user, loading, error] = useIdToken(auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <EmotionBackground emotion={Emotions.happy}>
      <FormContainer>
        <h1>Create Account</h1>
        <FormSection>
          <InputLabel htmlFor="username">Email</InputLabel>
          <TextInput
            id="username"
            className="ui-input"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </FormSection>

        <FormSection>
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextInput
            id="password"
            className="ui-input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormSection>
        <FormSection>
          <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
          <TextInput
            id="confirm-password"
            className="ui-input"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </FormSection>
        <div className="form-button-container">
          <UIButton
            disabled={!username.length || !password.length}
            onClick={() => {
              createUser(username, password).then((user) => {
                console.log(user);
              });
            }}
          >
            Create Account
          </UIButton>
          <Link to={"/login"}>
            <UIButton style={{ fontSize: 20 }}>Log In</UIButton>
          </Link>
        </div>
      </FormContainer>
    </EmotionBackground>
  );
}
