import axios from "axios";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./userAction";

// get users
export const getUser = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const response = await axios.get(
      "https://netflix-7yip.onrender.com/api/users",
      {
        headers: {
          token:
            "Nitin " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(getUsersSuccess(response.data));
  } catch (error) {
    dispatch(getUsersFailure());
  }
};

// delete user
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete("https://netflix-7yip.onrender.com/api/users/" + id, {
      headers: {
        token: "Nitin " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure());
  }
};

//update user
export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const response = await axios.put(
      `https://netflix-7yip.onrender.com/api/users/${id}`,
      user,
      {
        headers: {
          token:
            "Nitin " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(updateUserSuccess(response.data));
  } catch (error) {
    dispatch(updateUserFailure());
  }
};
