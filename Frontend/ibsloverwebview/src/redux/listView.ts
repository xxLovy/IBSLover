import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface IListState {
    listState: boolean;
}

const initialState: IListState = {
    listState: false,
};

export const listViewSlice = createSlice({
    name: "listView",
    initialState,
    reducers: {
        setListStateFalse: (state) => {
            state.listState = false;
        },
        setListStateTrue: (state) => {
            state.listState = true;
        },
        setListStateReverse: (state) => {
            state.listState = !state.listState
        }
    },
});

export const { setListStateFalse, setListStateTrue, setListStateReverse } = listViewSlice.actions;
export const listViewReducer = listViewSlice.reducer;
export const selectListState = (state: RootState) => state.listView.listState;