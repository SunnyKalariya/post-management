import { IEmployeesModal } from "../models/PostModal";
import UserServices from "../services/users-services";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../utility/constants";

export const login =
  (email: string, password: string) =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      const userServices = new UserServices();

      userServices.getUsers().then((response: { data: any[] }) => {
        const data = response.data.find(
          (x: IEmployeesModal) => x.email === email && x.password === password
        );
        localStorage.setItem("login", JSON.stringify(data));

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });
      });
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error,
      });
    }
  };

export const logout =
  () => async (dispatch: (arg0: { type: string }) => void) => {
    dispatch({
      type: USER_LOGOUT,
    });
    localStorage.removeItem("login");
  };
