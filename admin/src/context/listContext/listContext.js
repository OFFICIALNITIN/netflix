import listReducer from "./listReducer";
import { createContext, useReducer } from "react";


const INITIAL_STATE = {
    lists:[],
    isFetching:false,
    success:false,
    error:false
}

export const listsContext = createContext(INITIAL_STATE);

export const ListContextProvider = ({children}) => {
    const [ state , dispatch] = useReducer(listReducer,INITIAL_STATE)


    return <listsContext.Provider value={{lists:state.lists,isFetching:state.isFetching,success:state.success,error:state.error,dispatch}}>
        {children}
    </listsContext.Provider>
}