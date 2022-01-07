import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../actions/userActions";
import UserModalPopup from "../components/UserModalPopup";
import { EmployeesModal } from "../models/PostModal";

const LoginScreen = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(login(loginInfo.email, loginInfo.password ,navigate));
    setLoginInfo({ email: "", password: "" });
  };

  return (
    <>
      <Grid container className="login">
        {/* {loading ? (<CircularProgress className="loder" />)
                    : */}
        <div className="login-content">
          <form>
            {/* {error && (<Alert severity="error">{error}</Alert>)} */}
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
                onChange={(e) =>
                  setLoginInfo({
                    ...loginInfo,
                    [e.target.name]: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setLoginInfo({
                    ...loginInfo,
                    [e.target.name]: e.target.value,
                  })
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
              <Button className="forgot-password" onClick={() => setOpen(true)}>
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
      </Grid>
    </>
  );
};

export default LoginScreen;
