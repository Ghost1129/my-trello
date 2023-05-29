import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
    list: [],
};

const boardSlice = createSlice({
    name: "board",
    initialState: InitialState,
    reducers: {
        addBoard(state, action) {
            const {listId,listTitle} = action.payload;
            state.list.push({id:listId,title:listTitle,cards:[]});
            // state.push(action.payload);
        },
        removeBoard(state, action) {
            const {listId} = action.payload;
            const listIndex = state.list.findIndex((list) => list.id === listId);
            state.list.splice(listIndex, 1);
        },
        addCard(state, action) {
            const {listId,cardId,cardTitle,cardDescription} = action.payload;
            const listIndex = state.list.findIndex((list) => list.id === listId);
            state.list[listIndex].cards.push({id:cardId,columnid:listId,title:cardTitle,description:cardDescription});
        },
        updateCard(state, action) {
            const {listId,cardId,cardTitle,cardDescription} = action.payload;
            console.log(listId,cardId,cardTitle,cardDescription);
            const listIndex = state.list.findIndex((list) => list.id === listId);
            const cardIndex = state.list[listIndex].cards.findIndex((card) => card.id === cardId);
            state.list[listIndex].cards[cardIndex].title = cardTitle;
            state.list[listIndex].cards[cardIndex].description = cardDescription;
        }
    }
    
});

export const { addBoard, removeBoard,addCard,updateCard } = boardSlice.actions;


export default boardSlice.reducer;


