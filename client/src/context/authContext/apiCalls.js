import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://netflix-7yip.onrender.com/api/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const logout = (dispatch) => {
  dispatch(logout());
};
