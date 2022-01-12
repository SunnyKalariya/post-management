import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import UserServices from "../services/users-services";
import {
  IEmployeeError,
  IEmployeesModal,
  EmployeeError,
} from "../models/PostModal";
import { useSelector } from "react-redux";
import { EMAIL, EMAILREGEX, PASSWORDREGEX } from "../utility/constants";
import NotificationMsg from "./NotificationMsg";

interface OwnProps {
  data: IEmployeesModal;
  setOpen: () => void;
  open: boolean;
}

const UserModalPopup: React.FC<OwnProps> = ({ data, setOpen, open }) => {
  const userService = new UserServices();
  const [user, setUser] = useState<IEmployeesModal>(data);
  const [error, setError] = useState<IEmployeeError>(EmployeeError);

  const handleImg = (event: any) => {
    const file = event.target.files[0];
    //TODO: get image file and save to public folder

    const savedPath = `/images/${file.name}`;
    user.profileImg = savedPath;
    setUser(user);
  };

  const handleFormChange = (event: any) => {
    if (event.target.name === EMAIL) {
      const isEmail = EMAILREGEX.test(event.target.value);
      error.email = !isEmail;
    } else {
      const isPassword = PASSWORDREGEX.test(event.target.value);
      error.password = !isPassword;
    }
    setError(error);
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const userLogin = useSelector((state: any): any => state.userLogin);
  const { userInfo } = userLogin;

  const errorPresentOnSubmit = () => {
    const errors = { ...error };
    user.name === "" && (errors.name = true);
    user.address === "" && (errors.address = true);
    user.authorization === "" && (errors.authorization = true);
    user.password === "" && (errors.password = true);
    user.profileImg === "" && (errors.profileImg = true);
    user.email === "" && (errors.email = true);
    setError(errors);
  };

  useEffect(() => {
    setUser(data);
  }, [data]);
  console.log("data", data);

  const submitHandler = () => {
    if (
      user.name &&
      user.email &&
      user.address &&
      user.profileImg &&
      user.authorization
    ) {
      if (data.id > 0) {
        userService
          .updateUsers(user)
          .then((res: any) => {
            setUser(res.data);
            setOpen();
          })
          .catch((m: any) => {
            console.log(m);
          });
      } else {
        userService
          .addUsers(user)
          .then((res: any) => {
            setUser(res.data);
            setOpen();
          })
          .catch((m: any) => {
            console.log(m);
          });
      }
    } else {
      errorPresentOnSubmit();
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Employees
          </Typography>
          <form>
            <div className="form-group">
              <TextField
                value={user.name}
                id="name"
                type="name"
                name="name"
                label="User Name"
                variant="outlined"
                className="login-input"
                error={error.name ? true : false}
                helperText={error.name && "name is required"}
                onChange={(e) =>
                  setUser({
                    ...user,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <TextField
                value={user.email}
                id="email"
                type="email"
                name="email"
                label="User Email"
                variant="outlined"
                className="login-input"
                error={error.email ? true : false}
                helperText={error.email && "email is required"}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <TextField
                value={user.password}
                id="password"
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                className="login-input"
                error={error.password ? true : false}
                helperText={error.password && "password is required"}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <TextField
                id="address"
                value={user.address}
                label="address"
                name="address"
                type="address"
                autoComplete="current-password"
                className="login-input"
                variant="outlined"
                error={error.address ? true : false}
                helperText={error.address && "email is required"}
                onChange={(e) =>
                  setUser({
                    ...user,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <FormControl fullWidth className="login-input">
                <InputLabel id="demo-simple-select-label">
                  Authorization
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="authorization"
                  id="demo-simple-select"
                  value={userInfo ? user.authorization : "User"}
                  //defaultValue={userInfo.authorization}
                  label="Authorization"
                  onChange={(event: SelectChangeEvent) =>
                    setUser({
                      ...user,
                      [event.target.name]: event.target.value,
                    })
                  }
                >
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Admin">
                    {userInfo && userInfo.authorization && "Admin"}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="form-group">
              <TextField
                //value={user.profileImg}
                id="title"
                type="file"
                name="file"
                variant="outlined"
                className="login-input"
                error={error.profileImg ? true : false}
                helperText={error.profileImg && "Image is required"}
                onChange={(e) => handleImg(e)}
              />
            </div>
            <div className="user-profile-img">
              <img src={user.profileImg} alt="" className="" />
            </div>
            <Button
              type="button"
              className="btn btn-login text-center"
              onClick={submitHandler}
            >
              SAVE
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default UserModalPopup;
