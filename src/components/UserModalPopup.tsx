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
import { IEmployeesModal } from "../models/PostModal";
import { useSelector } from "react-redux";

interface OwnProps {
  data: IEmployeesModal;
  setOpen: () => void;
  open: boolean;
}

const UserModalPopup: React.FC<OwnProps> = ({ data, setOpen, open }) => {
  const userService = new UserServices();
  const [user, setUser] = useState<IEmployeesModal>(data);

  const userLogin = useSelector((state: any): any => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    setUser(data);
  }, [data]);

  const submitHandler = () => {
    console.log("user123", user);
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
                value={user.password}
                id="password"
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                className="login-input"
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
                id="address"
                value={user.address}
                label="address"
                name="address"
                type="address"
                autoComplete="current-password"
                className="login-input"
                variant="outlined"
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
                value={user.profileImg}
                id="title"
                type="file"
                name="profileImg"
                variant="outlined"
                className="login-input"
                onChange={(e) =>
                  setUser({
                    ...user,
                    [e.target.name]: e.target.value,
                  })
                }
              />
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
