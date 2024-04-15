import axios from "axios";
import { createMovieFailure, 
    createMovieStart, 
    createMovieSuccess,
     deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess, updateMovieFailure, updateMovieStart, updateMovieSuccess } from "./movieAction"

// get movies
export const getMovies = async( dispatch) =>{
    dispatch(getMoviesStart());
    try {
        const res = await axios.get("/movies",{headers:{token: "Nitin "+JSON.parse(localStorage.getItem("user")).accessToken}});
        dispatch(getMoviesSuccess(res.data))
        console.log(res.data)
    } catch (error) {
        dispatch(getMoviesFailure())
    }
}

// create movie
export const createMovie = async(movie, dispatch) =>{
    dispatch(createMovieStart());
    try {
        const res = await axios.post("/movies/",movie,{headers:{token: "Nitin "+JSON.parse(localStorage.getItem("user")).accessToken}});
        dispatch(createMovieSuccess(res.data))
    } catch (error) {
        dispatch(createMovieFailure())
    }
}

// update movie
export const updateMovie = async(id, movie, dispatch) =>{
    dispatch(updateMovieStart());
    console.log(dispatch)
    try {
        const res = await axios.put(`/movies/${id}`,movie,{headers:{token: "Nitin "+JSON.parse(localStorage.getItem("user")).accessToken}});
        dispatch(updateMovieSuccess(res.data))
        console.log(res.data)
    } catch (error) {
        dispatch(updateMovieFailure())
    }
}

//delete movies
export const deleteMovie = async(id, dispatch)=>{
    dispatch(deleteMovieStart())
    try {
        await axios.delete("/movies/"+id,{headers:{token: "Nitin "+JSON.parse(localStorage.getItem("user")).accessToken}})
        dispatch(deleteMovieSuccess(id))
    } catch (error) {
        dispatch(deleteMovieFailure())
    }
}