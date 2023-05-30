import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: null,
    loading: false,
    balance: 0,
    block: null,
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAccount(state, action) {
            const {Account} = action.payload;
            state.account = Account.account;
            state.balance = Account.balance;
            state.block = Account.block;
        }

    }
});

export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;