import { useAuth } from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./Login.css";

const Login = (props) => {
  const { signin } = useAuth();
  const [hasError, sethasError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <form
        className="login-form"
        onSubmit={handleSubmit((data) => {
          let response = signin(data.email, data.password).catch(error => sethasError(true));
        })}
      >
        <div className="login-form-input">
          <TextField
            {...register("email", {
              required: "*This is a required field.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "*Invalid email address.",
              },
            })}
            label="Email address"
            variant="outlined"
            fullWidth
            error={!!errors?.email}
            helperText={hasError ? "*Email or password is invalid." : (errors?.email ? errors.email.message : null)}
          />
        </div>
        <div className="login-form-input">
          <TextField
            {...register("password", {
              required: "*This is a required field.",
              minLength: {
                value: 6,
                message: "*Password needs to be at least 6 characters long.",
              },
            })}
            label="Password"
            variant="outlined"
            fullWidth
            error={!!errors?.password}
            helperText={errors?.password ? errors.password.message : null}
            type="password"
          />
        </div>
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Sign in
        </Button>
        <div className="signup-button">
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={props.onSignUp}
          >
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
