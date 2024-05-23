import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://netflix-7yip.onrender.com/api/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
    toast.success(`${res.data.username} logged In Successfully!`, {
      position: "top-center",
      theme: "dark",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(loginFailure());
    toast.error("Invalid details!", {
      position: "top-center",
      theme: "dark",
      autoClose: 2000,
    });
  }
};

export const logout = (dispatch) => {
  dispatch(logout());
};
