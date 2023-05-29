import { configureStore,combineReducers } from "@reduxjs/toolkit";

import boardSlice from "./slices/boardSlice";
import editSlice from "./slices/editSlice";
import cardSlice from "./slices/cardSlice";



const reducer = combineReducers({
   
    board: boardSlice,
    edit: editSlice,
    card: cardSlice,

});

const store = configureStore({
    reducer,
});
export default store;