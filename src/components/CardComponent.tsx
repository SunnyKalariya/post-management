import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CommentPopper from "../components/CommentPopper";
import { Clear } from "@mui/icons-material";
import {
  EmployeesModal,
  IEmployeesModal,
  IPostModal,
} from "../models/PostModal";
import PostServices from "../services/post-services";
import UserServices from "../services/users-services";
import HorizontalGallery from 'react-dynamic-carousel'

interface OwnProps {
  userInfo: IEmployeesModal | undefined;
  post: IPostModal;
  postService: PostServices;
  getPost: (value: number) => void;
  isDelete: boolean;
}

const CardComponent: React.FC<OwnProps> = ({
  userInfo,
  post,
  postService,
  getPost,
  isDelete,
}) => {
  const userLoginId = userInfo ? userInfo.id : 0;
  const userService = new UserServices();
  const [userDetail, setUserDetail] = useState<IEmployeesModal>(EmployeesModal);

  const deletePost = (id: number) => {
    postService
      .deletePostById(id)
      .then((response) => getPost(post.userId))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    userService
      .getUsersById(post.userId)
      .then((response) => setUserDetail(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Card className="post-card" key={post.id}>
        <CardHeader
          avatar={<Avatar aria-label="recipe">S</Avatar>}
          action={
            <IconButton aria-label="settings">
              {isDelete && (
                <Button
                  className="clear-btn"
                  onClick={() => deletePost(post.id)}
                >
                  <Clear />
                </Button>
              )}
            </IconButton>
          }
          title={userDetail.name}
          subheader={userDetail.address}
        />
        {/* <HorizontalGallery
          tiles={post.images.map((image) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 250,
                backgroundColor: "#D0D0D0",
                borderRadius: 10,
              }}
            > */}
              <CardMedia
                component="img"
                height="194"
                image={post.images[0]}
                alt="Paella dish"
              />
            {/* </div>
          ))}
          elementWidth={250}
          minPadding={20}
          fadeDistance={100}
        /> */}

        <CardContent className="post-card-content">
          <Link to={`/post/${post.id}`} className="post-info">
            <Typography component="div">
              <strong>{post.title}</strong>
            </Typography>
            <Typography component="div">
              <>{post.body}</>
            </Typography>
          </Link>
          <CommentPopper data={post} userId={userLoginId} />
        </CardContent>
      </Card>
    </>
  );
};

export default CardComponent;
