import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    edit: false,
    title: "",
    description: "",
    listId: "",
    cardId: "",
};

const editslice = createSlice({
    name: "editslice",
    initialState,
    reducers: {
        toggleEdit(state) {
            state.edit = !state.edit;
        },
        editCard(state,action) {
            const {Title,Description,listId,cardId} = action.payload;
            state.listId = listId;
            state.cardId = cardId;
            state.title = Title;
            state.description = Description;
        }


    }


});

export const { toggleEdit,editCard } = editslice.actions;

export default editslice.reducer;