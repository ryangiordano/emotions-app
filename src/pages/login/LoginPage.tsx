import { signInWithEmailAndPassword } from "firebase/auth";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { Emotions } from "../../components/face/constants";
import EmotionBackground from "../../components/emotion-container/EmotionBackground";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UIButton from "../../components/buttons/Button";
import TextInput from "../../components/forms/inputs/TextInput";
import InputLabel from "../../components/forms/label/InputLabel";
import FormContainer from "../../components/forms/container/FormContainer";
import FormSection from "../../components/forms/container/FormSection";

const login = async (username: string, password: string) => {
  return await signInWithEmailAndPassword(auth, username, password);
};

// const deleteUser = (user: User) => {
//   deleteFirebaseUser(user);
// };

// const logout = () => {
//   signOut(auth);
// };

function LoginPage() {
  const [loggedInUser] = useIdToken(auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser]);
  return (
    <EmotionBackground emotion={Emotions.happy}>
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          login(username, password)
            .then(({ user }) => {
              if (user.uid) {
                navigate("/");
              }
            })
            .catch(() => {
              setUsername("");
              setPassword("");
              setLoginFailed(true);
            });
        }}
      >
        <h1>Login</h1>
        <FormSection>
          <InputLabel htmlFor="username">Email</InputLabel>

          <TextInput
            id="username"
            className="ui-input"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </FormSection>
        <FormSection>
          <InputLabel>Password</InputLabel>
          <TextInput
            id="password"
            className="ui-input"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormSection>

        <div className="form-button-container">
          <UIButton
            type="submit"
            disabled={!username.length || !password.length}
          >
            Log in
          </UIButton>
          {/* Nav to new user */}
          <Link to={"/create-user"}>
            <UIButton>Create Account</UIButton>
          </Link>
        </div>
        {loginFailed && <p>Incorrect username or password</p>}
      </FormContainer>
    </EmotionBackground>
  );
}

export default LoginPage;
