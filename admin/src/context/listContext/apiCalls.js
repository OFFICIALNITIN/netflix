import axios from "axios";
import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess, updateListStart, updateListSuccess } from "./listAction"

// get lists
export const getLists = async( dispatch) =>{
    dispatch(getListsStart());
    try {
        const res = await axios.get("/lists",{headers:{token: "Nitin "+JSON.parse(localStorage.getItem("user")).accessToken}});
        dispatch(getListsSuccess(res.data))
    } catch (error) {
        dispatch(getListsFailure())
    }
}

// create list
export const createList = async(list, dispatch) =>{
    dispatch(createListStart());
    try {
        const res = await axios.post("/lists/",list,{headers:{token: "Nitin "+JSON.parse(localStorage.getItem("user")).accessToken}});
        dispatch(createListSuccess(res.data))
    } catch (error) {
        dispatch(createListFailure())
    }
}

// update list
export const updateList = async(id, list, dispatch) =>{
    dispatch(updateListStart());
    try {
        const res = await axios.put(`/lists/${id}`,list,{headers:{token: "Nitin "+JSON.parse(localStorage.getItem("user")).accessToken}});
        dispatch(updateListSuccess(res.data))
    } catch (error) {
            dispatch(updateListSuccess())
        }
    }
    
    //delete list
    export const deleteList = async(id, dispatch)=>{
        dispatch(deleteListStart())
        try {
            await axios.delete("/lists/"+id,{headers:{token: "Nitin "+JSON.parse(localStorage.getItem("user")).accessToken}})
            dispatch(deleteListSuccess(id))
        } catch (error) {
            dispatch(deleteListFailure())
        }
    }