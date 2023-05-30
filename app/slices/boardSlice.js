import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
    list: [],
};

const boardSlice = createSlice({
    name: "board",
    initialState: InitialState,
    reducers: {
        addBoard(state, action) {
            const {listId} = action.payload;
            state.list.push({id:listId,todos:[]});
            // state.push(action.payload);
        },
        removeBoard(state, action) {
            const {listId} = action.payload;
            const listIndex = state.list.findIndex((list) => list.id === listId);
            state.list.splice(listIndex, 1);
        },
        setBoard(state, action) {
            state.list = action.payload;
        },
        addCard(state, action) {
            const {listId,cardId,cardDescription} = action.payload;
            const listIndex = state.list.findIndex((list) => list.id === listId);
            state.list[listIndex].todos.push({id:cardId,columnid:listId,description:cardDescription});
        },
        updateCard(state, action) {
            const {listId,cardId,cardDescription} = action.payload;
            console.log(listId,cardId,cardDescription);
            const listIndex = state.list.findIndex((list) => list.id === listId);
            const cardIndex = state.list[listIndex].cards.findIndex((card) => card.id === cardId);
            state.list[listIndex].todos[cardIndex].id = cardId;
            state.list[listIndex].todos[cardIndex].description = cardDescription;
        }
    }
    
});

export const { addBoard, removeBoard,setBoard,addCard,updateCard } = boardSlice.actions;


export default boardSlice.reducer;


