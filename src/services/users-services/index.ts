import axios from "axios";
import { IEmployeesModal } from "../../models/PostModal";

class UserServices {
  getUsers = async (): Promise<any> => {
    try {
      const res = await axios.get("http://localhost:3001/employees");
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  getUsersById = async (id: number): Promise<any> => {
    try {
      const res = await axios.get(`http://localhost:3001/employees/${id}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  addUsers = async (data: IEmployeesModal): Promise<any> => {
    try {
      const res = await axios.post(`http://localhost:3001/employees`, data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  updateUsers = async (data: IEmployeesModal): Promise<any> => {
    try {
      const res = await axios.put(`http://localhost:3001/employees/${data.id}`, data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  deleteUsersById = async (id: number): Promise<any> => {
    try {
      const res = await axios.delete(`http://localhost:3001/employees/${id}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserServices;
