import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import ViewListIcon from "@mui/icons-material/ViewList";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import { IEmployeesModal } from "../../models/PostModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { useNavigate } from "react-router";

const Header = () => {
  const [userLoginInfo, setUserLoginInfo] = useState<IEmployeesModal>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorProfileEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const openProfile = Boolean(anchorProfileEl);
  const userLogin = useSelector((state: any): any => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      setUserLoginInfo(userInfo);
    }
    else{
      navigate('/');
    }
  }, [userInfo]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Grid container className="header-container">
      <Grid item className="header-content">
        <div>
          <Link href="/post" underline="none" title="Logo">
            Logo
          </Link>
          <TextField
            className="search-products"
            placeholder="Search Products..."
            variant="outlined"
          />
          <Button className="search-btn">SEARCH</Button>
        </div>
        <div className="header-btn">
          <span>
            {userLoginInfo ? (
              <>
                <Button
                  aria-haspopup="true"
                  aria-expanded={openProfile ? "true" : undefined}
                  className="login-person"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    setProfileAnchorEl(event.currentTarget)
                  }
                >
                  <PersonIcon />
                  {userLoginInfo.name}
                </Button>
                <Menu
                  anchorEl={anchorProfileEl}
                  open={openProfile}
                  onClose={() => setProfileAnchorEl(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {userLoginInfo.authorization === "Admin" && (
                    <Link href="/admin">
                      <MenuItem>
                        <ViewListIcon />
                        Users
                      </MenuItem>
                    </Link>
                  )}
                  <Link href={`/profile/${userLoginInfo.id}`}>
                    <MenuItem>
                      <PersonIcon />
                      Profile
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link href="/" underline="none">
                SIGN IN
              </Link>
            )}
          </span>
        </div>
      </Grid>
    </Grid>
  );
};

export default Header;
