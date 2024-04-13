import { createSlice } from '@reduxjs/toolkit'
import { operation } from './operations';

const initialState = {

}

export const Slice = createSlice({
    name: '',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(operation.pending, (state) => {
            })
            .addCase(operation.fulfilled, (state, action) => {
            })
            .addCase(operation.rejected, (state, action) => {
            })
    }
})


export const nameReducer = nameSlice.reducer;
