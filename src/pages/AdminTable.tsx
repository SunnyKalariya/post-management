import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EmployeesModal, IEmployeesModal } from "../models/PostModal";
import Button from "@mui/material/Button";
import UserModalPopup from "../components/UserModalPopup";
import UserServices from "../services/users-services";
import { useSelector } from "react-redux";

const AdminTable = () => {
  const [employees, setEmployees] = useState<IEmployeesModal[]>();

  const [editEmployees, setEditEmployees] =
    useState<IEmployeesModal>(EmployeesModal);
  const userService = new UserServices();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const userLogin = useSelector((state: any): any => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  });

  const getUsers = () => {
    userService
      .getUsers()
      .then((res: any) => {
        setEmployees(res.data);
      })
      .catch((m: any) => {
        console.log(m);
      });
  };

  useEffect(() => {
    getUsers();
  }, [open]);

  const deleteHandler = (id: number) => {
    userService
      .deleteUsersById(id)
      .then((res: any) => {
        getUsers();
      })
      .catch((m: any) => {
        console.log(m);
      });
  };

  const updateEmployeeInfo = (id: number) => {
    userService
      .getUsersById(id)
      .then((res: any) => {
        setEditEmployees(res.data);
        setOpen(true);
      })
      .catch((m: any) => {
        console.log(m);
      });
  };

  return (
    <>
      <h1>List of Users</h1>
      <Button
        className="btn add-btn"
        onClick={() => {
          setEditEmployees(EmployeesModal);
          setOpen(true);
        }}
      >
        Add User
      </Button>
      <UserModalPopup
        data={editEmployees}
        setOpen={() => setOpen(false)}
        open={open}
      />
      ;
      <TableContainer>
        <Table sx={{ maxWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">NAME</TableCell>
              <TableCell align="left">EMAIL</TableCell>
              <TableCell align="left">ADDRESS</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees &&
              employees.map((employee: IEmployeesModal) => (
                <TableRow
                  key={employee.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {employee.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {employee.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {employee.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {employee.address}
                  </TableCell>
                  {/* <TableCell component="th" scope="row">
                    <Button className="btn btn-login text-center">
                      <Link to={`/employee/${employee.postId}`}>View Post</Link>
                    </Button>
                  </TableCell> */}
                  <TableCell align="right">
                    <Button
                      className="btn"
                      onClick={() => updateEmployeeInfo(employee.id)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      className="btn"
                      onClick={() => deleteHandler(employee.id)}
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
