import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import UserModalPopup from "../components/UserModalPopup";
import { EmployeesModal } from "../models/PostModal";
import { EMAIL, EMAILREGEX, PASSWORDREGEX } from "../utility/constants";
import { Alert, CircularProgress } from "@mui/material";

const LoginScreen = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [open, setOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: any): any => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/post");
    }
  }, [userInfo]);

  const handleTextFieldChange = (event: any) => {
    if (event.target.name === EMAIL) {
      const isEmail = EMAILREGEX.test(event.target.value);
      errors.email = !isEmail;
    } else {
      // const isPassword = PASSWORDREGEX.test(event.target.value);
      // errors.password = !isPassword;
    }
    setErrors(errors);
    setLoginInfo({
      ...loginInfo,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = () => {
    if (loginInfo.email && loginInfo.password) {
      dispatch(login(loginInfo.email, loginInfo.password, navigate));
      setLoginInfo({ email: "", password: "" });
    } else {
      const loginError = { ...errors };
      loginInfo.email === "" && (loginError.email = true);
      loginInfo.password === "" && (loginError.password = true);
      setErrors(loginError);
    }
  };

  return (
    <>
      <Grid container className="login">
        {loading ? (
          <CircularProgress className="loder" />
        ) : (
          <>
            {error && <Alert severity="error">{error}</Alert>}
            <div className="login-content">
              <form>
                <h2>Login</h2>
                <div className="form-group">
                  <TextField
                    value={loginInfo.email}
                    id="email"
                    type="email"
                    name="email"
                    label="User Email"
                    variant="outlined"
                    className="login-input"
                    onChange={handleTextFieldChange}
                    error={errors.email}
                    helperText={errors.email && "please write correct email"}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    id="password"
                    value={loginInfo.password}
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="login-input"
                    variant="outlined"
                    onChange={handleTextFieldChange}
                    error={errors.password}
                    helperText={
                      errors.password && "please write correct password"
                    }
                  />
                </div>
                <Grid container className="login-actions">
                  <Button
                    type="button"
                    className="btn login-btn text-center"
                    onClick={submitHandler}
                  >
                    LOGIN{" "}
                  </Button>
                  <Button
                    className="forgot-password"
                    onClick={() => setOpen(true)}
                  >
                    New User? Register
                  </Button>
                  <UserModalPopup
                    data={EmployeesModal}
                    open={open}
                    setOpen={() => setOpen(false)}
                  />
                </Grid>
              </form>
            </div>
          </>
        )}
      </Grid>
    </>
  );
};

export default LoginScreen;
