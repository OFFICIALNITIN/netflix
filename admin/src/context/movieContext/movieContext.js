import { useEffect } from "react";
import movieReducer from "./movieReducer";
import { createContext, useReducer } from "react";


const INITIAL_STATE = {
    movies:[],
    isFetching:false,
    error:false
}

export const movieContext = createContext(INITIAL_STATE);

export const MovieContextProvider = ({children}) => {
    const [ state , dispatch] = useReducer(movieReducer,INITIAL_STATE)


    return <movieContext.Provider value={{movies:state.movies,isFetching:state.isFetching,error:state.error,dispatch}}>
        {children}
    </movieContext.Provider>
}