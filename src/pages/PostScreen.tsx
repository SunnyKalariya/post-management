import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { IPostModal, PostModal } from "../models/PostModal";
import PostServices from "../services/post-services";
import PostModalPopup from "../components/PostModalPopup";
import { CircularProgress, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";

const PostScreen = () => {
  const [posts, setPosts] = useState<IPostModal[]>();
  const postService = new PostServices();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const userLogin = useSelector((state: any): any => state.userLogin);

  const { userInfo, loading } = userLogin;
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
      {loading ? (
        <CircularProgress className="loder" />
      ) : (
        <>
          <div className="post-heading">
            <h1>POST</h1>
            <Button className="btn add-btn" onClick={() => setOpen(true)}>
              Add Post
            </Button>
          </div>
          <PostModalPopup setOpen={() => setOpen(false)} open={open} postData={PostModal} />
          <Grid className="post-content">
            {posts &&
              posts.map((post: IPostModal) => (
                <CardComponent
                  userInfo={userInfo}
                  post={post}
                  postService={postService}
                  getPost={() => getPost()}
                  key={post.id}
                  isAction={false}
                />
              ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default PostScreen;
