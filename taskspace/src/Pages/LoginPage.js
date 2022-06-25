import "./LoginPage.css";
import { Container } from "@mui/system";
import { useState } from "react";
import Login from "../Components/Login/Login";
import Signup from "../Components/Login/Signup";

const LoginPage = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const signUpHandler = () => {
    setIsSigningUp(true);
  };

  const goBackHandler = () => {
    setIsSigningUp(false);
  };

  return (
    <div className="main-login">
      <Container maxWidth="xs">
        <h1>TaskSpace</h1>
        {isSigningUp ? (
          <Signup onGoBack={goBackHandler} />
        ) : (
          <Login onSignUp={signUpHandler} />
        )}
      </Container>
    </div>
  );
};

export default LoginPage;
