import { Autocomplete, Button, TextField } from "@mui/material";
import { academicYear, majors } from "../../Others/Academic";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/useAuth";
import "./Signup.css";
import { useState } from "react";
import { db } from "../../Config/firebaseConfig"
import { doc, setDoc } from "firebase/firestore";

const Signup = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { signup } = useAuth();
  const [validSignup, setValidSignup] = useState(true);

  return (
    <div>
      <form
        onSubmit={handleSubmit(async (data) => {
          const userdetails = 
          {firstName: data.firstName, 
            lastName: data.lastName,
            major: data.major,
            year: data.year
          };
          signup(data.email, data.password, userdetails).catch(error => setValidSignup(false));
        })
      }
      >
        <div className="signup__name">
          <div className="signup__input">
            <TextField
              label="First name"
              sx={{ width: 190 }}
              {...register("firstName", {
                required: "*This is a required field.",
              })}
              error={!!errors?.firstName}
              helperText={errors?.firstName ? errors.firstName.message : null}
            />
          </div>
          <div className="signup__input">
            <TextField
              label="Last name"
              sx={{ width: 190 }}
              {...register("lastName", {
                required: "*This is a required field.",
              })}
              error={!!errors?.lastName}
              helperText={errors?.lastName ? errors.lastName.message : null}
            />
          </div>
        </div>
        <div className="signup__input">
          <TextField
            label="Email address"
            fullWidth
            {...register("email", {
              required: "*This is a required field.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "*Invalid email address.",
              },
            })}
            error={!!errors?.email}
            helperText={validSignup? (errors?.email ? errors.email.message : null) : "*Email account is already in use."}
          />
        </div>
        <div className="signup__input">
          <TextField
            label="Password"
            fullWidth
            {...register("password", {
              required: "*This is a required field.",
              minLength: {
                value: 6,
                message: "*Password needs to be at least 6 characters long.",
              },
            })}
            error={!!errors?.password}
            helperText={errors?.password ? errors.password.message : null}
            type="password"
          />
        </div>
        <div className="signup__input">
          <TextField
            label="Confirm password"
            fullWidth
            {...register("confirm", {
              required: "*This is a required field.",
              validate: (val) => {
                if (watch("password") !== val) {
                  return "*Your passwords do not match.";
                }
              },
            })}
            error={!!errors?.confirm}
            helperText={errors?.confirm ? errors.confirm.message : null}
            type="password"
          />
        </div>
        <div className="signup__academic">
          <div className="signup__major">
            <Autocomplete
              disablePortal
              options={majors}
              sx={{ width: 260 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Major"
                  {...register("major", {
                    required: "*This is a required field.",
                  })}
                  error={!!errors?.major}
                  helperText={errors?.major ? errors.major.message : null}
                />
              )}
            />
          </div>
          <div className="signup__year">
            <Autocomplete
              disablePortal
              options={academicYear}
              sx={{ width: 135 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Year of study"
                  {...register("year", {
                    required: "*This is a required field.",
                  })}
                  error={!!errors?.year}
                  helperText={errors?.year ? errors.year.message : null}
                />
              )}
            />
          </div>
        </div>
        <div className="signup__buttons">
          <div>
            <Button variant="contained" size="large" onClick={props.onGoBack}>
              Go back
            </Button>
          </div>
          <div className="create-account__button">
            <Button
              variant="contained"
              color="success"
              size="large"
              type="submit"
            >
              Create account
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
