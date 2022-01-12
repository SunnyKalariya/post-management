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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CommentPopper from "../components/CommentPopper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  EmployeesModal,
  IEmployeesModal,
  IPostModal,
} from "../models/PostModal";
import PostServices from "../services/post-services";
import UserServices from "../services/users-services";
import DeleteConfirmation from "./DeleteConfirmation";
import PostModalPopup from "./PostModalPopup";

interface OwnProps {
  userInfo: IEmployeesModal | undefined;
  post: IPostModal;
  postService: PostServices;
  getPost: (value: number) => void;
  isAction: boolean;
}

const CardComponent: React.FC<OwnProps> = ({
  userInfo,
  post,
  postService,
  getPost,
  isAction,
}) => {
  const userLoginId = userInfo ? userInfo.id : 0;
  const userService = new UserServices();
  const [userDetail, setUserDetail] = useState<IEmployeesModal>(EmployeesModal);
  const [deletConfirm, setDeleteConfirm] = useState<boolean>(false);
  const [anchorElModal, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openModal = Boolean(anchorElModal);
  const [openPostModal, setPostModalOpen] = useState<boolean>(false);
  const [postInfo, setPostInfo] = useState<IPostModal>(post);

  const isLike = post.liked.find((x): any => x === userLoginId);

  const deletePost = (id: number) => {
    postService
      .deletePostById(id)
      .then((response) => getPost(post.userId))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getPost(post.userId);
  }, [openPostModal]);

  useEffect(() => {
    userService
      .getUsersById(post.userId)
      .then((response) => setUserDetail(response.data))
      .catch((error) => console.error(error));
  }, []);

  const updatePost = (postData: IPostModal) => {
    postService
      .updatePost(postData)
      .then((response) => {
      setPostInfo(response.data);
      })
      .catch((error) => console.error(error));
  };

  const likeHandler = () => {
    !isLike && post.liked.push(userLoginId);
    if (isLike) {
      var index = post.liked.indexOf(isLike);
      if (index !== -1) {
        post.liked.splice(index, 1);
      }
    }
    post.likes += isLike ? -1 : 1;
    updatePost(post);
  };

  return (
    <>
      <Card className="post-card" key={post.id} onDoubleClick={likeHandler}>
        <CardHeader
          avatar={<Avatar aria-label="recipe">S</Avatar>}
          action={
            <IconButton aria-label="settings">
              {isAction && (
                <>
                  <Button
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                      setAnchorEl(event.currentTarget)
                    }
                    className="clear-btn"
                  >
                    <MoreVertIcon />
                  </Button>
                  <Menu open={openModal} onClose={() => setAnchorEl(null)}>
                    <MenuItem onClick={() => setPostModalOpen(true)}>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => setDeleteConfirm(true)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </>
              )}
            </IconButton>
          }
          title={userDetail.name}
          subheader={userDetail.address}
        />
        <PostModalPopup
          setOpen={() => setPostModalOpen(false)}
          open={openPostModal}
          postData={post}
        />
        <DeleteConfirmation
          open={deletConfirm}
          setOpen={() => setDeleteConfirm(false)}
          deleteHandler={(value: number) => deletePost(value)}
          Id={post.id}
        />
        <CardMedia
          component="img"
          height="194"
          image={post.images}
          alt="Paella dish"
        />
        <CardContent className="post-card-content">
          <Link to={`/post/${post.id}`} className="post-info">
            <Typography component="div">
              <strong>{post.title}</strong>
            </Typography>
            <Typography component="div">
              <>{post.body}</>
            </Typography>
          </Link>
          <CommentPopper data={postInfo} isLike={isLike} likeHandler={likeHandler} />
        </CardContent>
      </Card>
    </>
  );
};

export default CardComponent;
