import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";


export interface IFilter {
    women: boolean;
    men: boolean;
    accessible: boolean;
    children: boolean;
    free: boolean;
    genderNeutral: boolean;
    voteCount: number;
    keyword: string[];
}

const initialState: IFilter = {
    women: false,
    men: false,
    accessible: false,
    children: false,
    free: false,
    genderNeutral: false,
    voteCount: 0,
    keyword: []
}


export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setWomen: (state, action: PayloadAction<boolean>) => {
            state.women = action.payload;
        },
        setMen: (state, action: PayloadAction<boolean>) => {
            state.men = action.payload;
        },
        setAccessible: (state, action: PayloadAction<boolean>) => {
            state.accessible = action.payload;
        },
        setChildren: (state, action: PayloadAction<boolean>) => {
            state.children = action.payload;
        },
        setFree: (state, action: PayloadAction<boolean>) => {
            state.free = action.payload;
        },
        setGenderNeutral: (state, action: PayloadAction<boolean>) => {
            state.genderNeutral = action.payload;
        },
        setVoteCount: (state, action: PayloadAction<number>) => {
            state.voteCount = action.payload;
        },
        setKeyword: (state, action: PayloadAction<string[]>) => {
            state.keyword = action.payload;
        },
        resetFilters: (state) => {
            state.women = initialState.women;
            state.men = initialState.men;
            state.accessible = initialState.accessible;
            state.children = initialState.children;
            state.free = initialState.free;
            state.genderNeutral = initialState.genderNeutral;
            state.voteCount = initialState.voteCount;
            state.keyword = initialState.keyword;
        }
    }
});

export const {
    setWomen,
    setMen,
    setAccessible,
    setChildren,
    setFree,
    setGenderNeutral,
    setVoteCount,
    setKeyword,
    resetFilters
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;

export const selectFilterState = (state: RootState) => state.filter