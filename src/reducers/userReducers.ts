import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_LOGIN_FAIL } from "../utility/constants";

export const userLoginReducers = (state = {}, action: { type: any; payload: any; }) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true };
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  };