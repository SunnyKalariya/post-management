import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router";
import PostServices from "../services/post-services";
import { IEmployeesModal, IPostModal } from "../models/PostModal";
import CardComponent from "../components/CardComponent";
import UserServices from "../services/users-services";

const ProfileScreen = () => {
  const [userPost, setUserPost] = useState<IPostModal[]>();
  const [userInfo, setUserInfo] = useState<IEmployeesModal>();
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
  }, []);

  return (
    <>
      <h2 className="profile-heading">Profile</h2>
      <Grid container className="profile-container">
        <Grid item className="user-profile">
          <h2>{userInfo && userInfo.authorization}</h2>
          <div>
            <p>
              <strong>Name:</strong> {userInfo && userInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {userInfo && userInfo.email}
            </p>
            <p>
              <strong>Address:</strong> {userInfo && userInfo.address}
            </p>
          </div>
        </Grid>
        <h3>POST</h3>
        <Grid item className="post-content">
          {userPost &&
            userPost.map((post: IPostModal) => (
              <CardComponent
                userInfo={userInfo && userInfo}
                post={post}
                postService={postService}
                getPost={(value: number) => getPostByUserId(value)}
                key={post.id}
                isDelete={true}
              />
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileScreen;
