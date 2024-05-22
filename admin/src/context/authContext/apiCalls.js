import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://netflix-7yip.onrender.com/api/auth/login",
      user
    );
    res.data.isAdmin && dispatch(loginSuccess(res.data));
    toast.success("logged In Successfully!");
  } catch (error) {
    dispatch(loginFailure());
    toast.error(error.response.data);
  }
};
