import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useParams } from "react-router";
import PostServices from "../services/post-services";
import {
  EmployeesModal,
  IEmployeesModal,
  IPostModal,
} from "../models/PostModal";
import CardComponent from "../components/CardComponent";
import UserServices from "../services/users-services";
import { Edit } from "@mui/icons-material";
import UserModalPopup from "../components/UserModalPopup";

const ProfileScreen = () => {
  const [userPost, setUserPost] = useState<IPostModal[]>();
  const [userInfo, setUserInfo] = useState<IEmployeesModal>(EmployeesModal);
  const [open, setOpen] = useState<boolean>(false);
  const userId = useParams();
  const postService = new PostServices();
  const userService = new UserServices();

  const getUserByID = (userId: number) => {
    userService
      .getUsersById(userId)
      .then((response) => {
        getPostByUserId(response.data.id);
        console.log(response.data.id);
        setUserInfo(response.data);
      })
      .catch((error) => console.error(error));
  };

  const getPostByUserId = (id: number) => {
    postService
      .getPostByUserId(id)
      .then((response) => setUserPost(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserByID(Number(userId.id));
  }, [open]);

  return (
    <>
      <h2 className="profile-heading">Profile</h2>
      <Grid container className="profile-container">
        <Grid item className="user-profile">
          <div className="user-auth-edit">
            <h2>{userInfo.authorization}</h2>
            <Button onClick={() => setOpen(true)}>
              <Edit />
            </Button>
          </div>
          <UserModalPopup
            data={userInfo}
            setOpen={() => setOpen(false)}
            open={open}
          />
          <div>
            <span className="profile-img">
              <img src={userInfo.profileImg} alt="profile-image" />
            </span>
            <p>
              <strong>Name:</strong> {userInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
              <strong>Address:</strong> {userInfo.address}
            </p>
          </div>
        </Grid>
        <h3>POST</h3>
        <Grid item className="post-content">
          {userPost &&
            userPost.map((post: IPostModal) => (
              <CardComponent
                userInfo={userInfo}
                post={post}
                postService={postService}
                getPost={(value: number) => getPostByUserId(value)}
                key={post.id}
                isAction={true}
              />
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileScreen;
