import React, { useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { userModal } from "../models/PostModal";

interface OwnProps {
  post: userModal;
}

const Popper: React.FC<OwnProps> = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState<boolean>(false);

  return (
    <>
      <div className="comments">
        <Rating
          name="customized-color"
          className="rating"
          defaultValue={0}
          getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
          max={1}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
        <Button
          variant="contained"
          onClick={() => setCommentOpen(!commentOpen)}
        >
          <CommentIcon />
        </Button>
      </div>
      {commentOpen && (
        <Typography component="div">
          <strong>{post.body}</strong>
        </Typography>
      )}
    </>
  );
};

export default Popper;
