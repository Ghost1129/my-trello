import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    edit: false,
    description: "",
    listId: "",
    cardId: "",
    title: "",
};

const editslice = createSlice({
    name: "editslice",
    initialState,
    reducers: {
        toggleEdit(state) {
            state.edit = !state.edit;
        },
        editCard(state,action) {
            const {Description,listId,cardId,cardTitle} = action.payload;
            state.listId = listId;
            state.cardId = cardId;
            state.description = Description;
            state.title = cardTitle;
        }


    }


});

export const { toggleEdit,editCard } = editslice.actions;

export default editslice.reducer;