import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IPostModal } from "../models/PostModal";
import CommentPopper from "../components/CommentPopper";
import PostServices from "../services/post-services";
import { Clear } from "@mui/icons-material";
import PostModalPopup from "../components/PostModalPopup";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

const PostPage = () => {
  const [posts, setPosts] = useState<IPostModal[]>();
  const postService = new PostServices();
  const [open, setOpen] = useState<boolean>(false);

  const userLogin = useSelector((state: any): any => state.userLogin);
  const { userInfo } = userLogin;

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

  const deletePost = (id: number) => {
    postService
      .deletePostById(id)
      .then((response) => getPost())
      .catch((error) => console.error(error));
  };

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
            <Card className="post-card" key={post.id}>
              {userInfo && userInfo.authorization === "Admin" && (
                <Button
                  className="clear-btn"
                  onClick={() => deletePost(post.id)}
                >
                  <Clear />
                </Button>
              )}
              <CardContent className="post-card-content">
                <Link to={`/post/${post.id}`} className="post-info">
                  <Typography component="div">
                    <strong>{post.title}</strong>
                  </Typography>
                  <Typography component="div">
                    <>{post.body}</>
                  </Typography>
                </Link>
                <CommentPopper data={post} />
              </CardContent>
            </Card>
          ))}
      </Grid>
    </>
  );
};

export default PostPage;
