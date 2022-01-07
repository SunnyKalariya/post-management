import React, { useEffect, useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import {
  IComments,
  IPostModal,
} from "../models/PostModal";
import Delete from "@mui/icons-material/Delete";
import PostServices from "../services/post-services";
import CommentModalPopup from "./CommentInput";

interface OwnProps {
  data: IPostModal;
  userId: number;
}

const CommentPopper: React.FC<OwnProps> = ({
  data,
  userId,
}) => {
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<IComments[]>();
  const [post, setPost] = useState<IPostModal>(data);
  const postService = new PostServices();
  const isLike = data.liked.find((x): any => x === userId);

  const getComments = () => {
    postService
      .getCommentsByID(data.id)
      .then((res: any) => {
        setComments(res.data);
      })
      .catch((m: any) => {
        console.log(m);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  const deleteComments = (id: number) => {
    postService
      .deleteCommentsByPostId(id)
      .then((res: any) => getComments())
      .catch((error) => console.error(error));
  };

  const updatePost = (postData: IPostModal) => {
    postService
      .updatePost(postData)
      .then((response) => {
      setPost(response.data);
      })
      .catch((error) => console.error(error));
  };

  const likeHandler = () => {
    !isLike && data.liked.push(userId);
    if (isLike) {
      var index = data.liked.indexOf(isLike);
      if (index !== -1) {
        data.liked.splice(index, 1);
      }
    }

    data.likes += isLike ? -1 : 1;
    updatePost(data);
  };

  const comment = (
    <>
      {comments &&
        comments.map((comment) => (
          <div className="comments-layout" key={comment.id}>
            <span>
              <strong>{comment.name}</strong> &nbsp;{comment.body}
            </span>
            <Button onClick={() => deleteComments(comment.id)}>
              <Delete />
            </Button>
          </div>
        ))}
      <CommentModalPopup data={data} getComments={getComments} />
    </>
  );

  return (
    <>
      <div className="comments">
        <div className="likes">
          <Rating
            name="customized-color"
            className="rating"
            value={isLike ? 1 : 0}
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            max={1}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            onChange={likeHandler}
          />
          {data.likes}
        </div>
        <Button
          variant="contained"
          onClick={() => {
            setCommentOpen(!commentOpen);
          }}
        >
          <CommentIcon />
        </Button>
      </div>
      {commentOpen && comment}
    </>
  );
};

export default CommentPopper;
