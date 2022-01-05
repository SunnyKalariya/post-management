import React, { useEffect, useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import { IComments, IPostModal } from "../models/PostModal";
import Delete from "@mui/icons-material/Delete";
import PostServices from "../services/post-services";
import CommentModalPopup from "./CommentModalPopup";

interface OwnProps {
  data: IPostModal;
}

const CommentPopper: React.FC<OwnProps> = ({ data }) => {
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<IComments[]>();
  const postService = new PostServices();

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
            defaultValue={0}
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            max={1}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
          {/* {post.likes} */}
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
