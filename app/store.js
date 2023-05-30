import { configureStore,combineReducers } from "@reduxjs/toolkit";

import boardSlice from "./slices/boardSlice";
import editSlice from "./slices/editSlice";

import accountSlice from "./slices/accountSlice";



const reducer = combineReducers({
   
    board: boardSlice,
    edit: editSlice,
    
    account: accountSlice,

});

const store = configureStore({
    reducer,
});
export default store;