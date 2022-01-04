import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import CommentIcon from "@mui/icons-material/Comment";
import { userModal } from "../models/PostModal";
import Popper from "../components/Popper";

const PostPage = () => {
  const [posts, setPosts] = useState<userModal[]>();
  const postId = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId.id}/comments`)
      .then((response) => response.json())
      .then((json: userModal[]) => setPosts(json));
  }, []);

  return (
    <>
      <h1>List of Posts</h1>
      {posts &&
        posts.map((post: userModal) => (
          <Card className="post-card" key={post.id}>
            <CardContent className="post-card-content">
              <Link to={`/post/${post.id}`} className="post-info">
                <Typography component="div">
                  <strong>{post.name}</strong>
                </Typography>
              </Link>
              <Popper post={post} />
            </CardContent>
          </Card>
        ))}
    </>
  );
};

export default PostPage;
