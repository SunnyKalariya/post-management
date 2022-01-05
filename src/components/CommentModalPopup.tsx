import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Button from "@mui/material/Button";
import { Commnets, IComments, IPostModal } from "../models/PostModal";
import PostServices from "../services/post-services";
import { useSelector } from "react-redux";

interface OwnProps {
  data: IPostModal;
  getComments: () => void;
}

const CommentModalPopup: React.FC<OwnProps> = ({ data, getComments }) => {
  const postService = new PostServices();
  const [commentInfo, setCommentInfo] = useState<IComments>(Commnets);

  const userLogin = useSelector((state: any): any => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = () => {
    if (userInfo) {
      commentInfo.postId = data.id;
      commentInfo.name = userInfo.name;
      commentInfo.email = userInfo.email;
      setCommentInfo(commentInfo);
    }
    postService
      .addCommentsByPostId(commentInfo)
      .then((res: any) => {
        setCommentInfo(Commnets);
        getComments();
      })
      .catch((m: any) => {
        console.log(m);
      });
  };

  return (
    <>
      <form className="comment-form">
        <div className="form-group">
          <TextField
            value={commentInfo.body}
            id="body"
            type="body"
            name="body"
            label="Comment"
            variant="standard"
            className="login-input"
            onChange={(e) =>
              setCommentInfo({
                ...commentInfo,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <Button type="button" variant="contained" onClick={submitHandler}>
          <AddCommentIcon />
        </Button>
      </form>
    </>
  );
};

export default CommentModalPopup;
