import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { userModal } from "../models/PostModal";
import Button from "@mui/material/Button";
import ModalPopup from "../components/ModalPopup";

const AdminTable = () => {
  const [posts, setPosts] = useState<userModal[]>();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((json: userModal[]) => setPosts(json));
  }, []);

  const deleteHandler = (id: number) => {
    fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <>
      <h1>List of Users</h1>
      <ModalPopup />
      <TableContainer>
        <Table sx={{ maxWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">USERS</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts &&
              posts.map((post: userModal) => (
                <TableRow
                  key={post.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {post.postId}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {post.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button className="btn btn-login text-center">
                      <Link to={`/post/${post.postId}`}>View Post</Link>
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button className="btn btn-login text-center">
                      <EditIcon />
                    </Button>
                    <Button
                      className="btn btn-login text-center"
                      onClick={() => deleteHandler(post.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminTable;
