import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CommentPopper from "../components/CommentPopper";
import { Clear } from "@mui/icons-material";
import { IEmployeesModal, IPostModal } from "../models/PostModal";
import PostServices from "../services/post-services";

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

  const deletePost = (id: number) => {
    postService
      .deletePostById(id)
      .then((response) => getPost(post.userId))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Card className="post-card" key={post.id}>
        <div>
        
        {isDelete && (
          <Button className="clear-btn" onClick={() => deletePost(post.id)}>
            <Clear />
          </Button>
        )}
        </div>
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
