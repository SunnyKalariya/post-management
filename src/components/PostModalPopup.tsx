import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IPostModal } from "../models/PostModal";
import PostServices from "../services/post-services";
import { useSelector } from "react-redux";

interface OwnProps {
  setOpen: () => void;
  open: boolean;
  postData: IPostModal;
}

const PostModalPopup: React.FC<OwnProps> = ({ setOpen, open, postData }) => {
  const postService = new PostServices();
  const [postInfo, setPostInfo] = useState<IPostModal>(postData);
  const userLogin = useSelector((state: any): any => state.userLogin);
  const { userInfo } = userLogin;
  const [filePath, setFilePath] = useState<string>("");

  const handleImg = (event: any) => {
    //TODO: get image file and save to public folder
    const file = event.target.files[0];
    const savedPath = `/images/${file.name}`;
    setFilePath(savedPath);
  };

  const submitHandler = () => {
    postInfo.images = filePath;
    postInfo.userId = userInfo.id;
    postInfo.liked = [];
    if (postInfo.id > 0) {
      postService
        .updatePost(postInfo)
        .then((res: any) => {
          setOpen();
          setPostInfo(res.data);
        })
        .catch((m: any) => {
          console.log(m);
        });
    } else {
      setPostInfo(postInfo);
      postService
        .addPost(postInfo)
        .then((res: any) => {
          setPostInfo(res.data);
          setOpen();
        })
        .catch((m: any) => {
          console.log(m);
        });
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {postInfo.title !== "" ? "Update Post" : "Add New Post"}
          </Typography>
          <form>
            <div className="form-group">
              <TextField
                // value={postInfo.images}
                id="title"
                type="file"
                name="images"
                variant="outlined"
                className="login-input"
                onChange={(e) => handleImg(e)}
              />
            </div>
            <div className="form-group">
              <TextField
                value={postInfo.title}
                id="title"
                type="text"
                name="title"
                label="Title"
                variant="outlined"
                className="login-input"
                onChange={(e) =>
                  setPostInfo({
                    ...postInfo,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <TextField
                value={postInfo.body}
                id="body"
                type="text"
                name="body"
                label="Post"
                variant="outlined"
                className="login-input"
                onChange={(e) =>
                  setPostInfo({
                    ...postInfo,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <Button
              type="button"
              className="btn btn-login text-center"
              onClick={submitHandler}
            >
              SAVE
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default PostModalPopup;
