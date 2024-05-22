import axios from "axios";
import {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  updateMovieFailure,
  updateMovieStart,
  updateMovieSuccess,
} from "./movieAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// get movies
export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get(
      "https://netflix-7yip.onrender.com/api/movies",
      {
        headers: {
          token:
            "Nitin " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(getMoviesSuccess(res.data));
    console.log(res.data);
  } catch (error) {
    dispatch(getMoviesFailure());
  }
};

// create movie
export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try {
    const res = await axios.post(
      "https://netflix-7yip.onrender.com/api/movies/",
      movie,
      {
        headers: {
          token:
            "Nitin " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(createMovieSuccess(res.data));
    toast.success("Movie added!");
  } catch (error) {
    dispatch(createMovieFailure());
    toast.error(error.response.data);
  }
};

// update movie
export const updateMovie = async (id, movie, dispatch) => {
  dispatch(updateMovieStart());
  console.log(dispatch);
  try {
    const res = await axios.put(
      `https://netflix-7yip.onrender.com/api/movies/${id}`,
      movie,
      {
        headers: {
          token:
            "Nitin " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(updateMovieSuccess(res.data));
    toast.success("Movie updated!");
  } catch (error) {
    dispatch(updateMovieFailure());
    toast.error(error.response.data);
  }
};

//delete movies
export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    await axios.delete("https://netflix-7yip.onrender.com/api/movies/" + id, {
      headers: {
        token: "Nitin " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteMovieSuccess(id));
    toast.success("Movie deleted!");
  } catch (error) {
    dispatch(deleteMovieFailure());
    toast.error(error.response.data);
  }
};
