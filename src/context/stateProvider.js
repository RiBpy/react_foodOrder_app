import React, { createContext, useContext, useReducer } from 'react';

const StateContext=createContext();
const StateProvider=({reducer,initialState,children})=>(
//const [searchText, setSearchText] = useState("a");
  (
  <StateContext.Provider value={
    useReducer(reducer,initialState,)
     }>
     {children}
 </StateContext.Provider>
 )

    )
export const useGlobalState=()=>useContext(StateContext);
export { StateContext, StateProvider };

