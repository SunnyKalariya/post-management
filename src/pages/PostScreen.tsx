import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { IPostModal } from "../models/PostModal";
import PostServices from "../services/post-services";
import PostModalPopup from "../components/PostModalPopup";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";

const PostScreen = () => {
  const [posts, setPosts] = useState<IPostModal[]>();
  const postService = new PostServices();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const userLogin = useSelector((state: any): any => state.userLogin);

  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  });

  const getPost = () => {
    postService
      .getPost()
      .then((res: any) => {
        setPosts(res.data);
        console.log("res", res);
      })
      .catch((m: any) => {
        console.log(m);
      });
  };

  useEffect(() => {
    getPost();
  }, [open]);

  return (
    <>
      <div className="post-heading">
        <h1>POST</h1>
        <Button className="btn add-btn" onClick={() => setOpen(true)}>
          Add Post
        </Button>
      </div>
      <PostModalPopup setOpen={() => setOpen(false)} open={open} />
      <Grid className="post-content">
        {posts &&
          posts.map((post: IPostModal) => (
            <CardComponent
              userInfo={userInfo}
              post={post}
              postService={postService}
              getPost={() => getPost()}
              key={post.id}
              isDelete={false}
            />
          ))}
      </Grid>
    </>
  );
};

export default PostScreen;
