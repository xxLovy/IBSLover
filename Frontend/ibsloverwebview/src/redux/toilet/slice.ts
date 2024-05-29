import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchToiletFromGoogle, fetchToiletFromUser } from "./operations"
import { RootState } from "../store"

interface IToiletState {
    userToilets: Toilet[],
    googleToilets: Toilet[]
}

const initialState: IToiletState = {
    userToilets: [],
    googleToilets: []
}

export const toiletSlice = createSlice({
    name: "toilet",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchToiletFromUser.fulfilled, (state, action: PayloadAction<Toilet[]>) => {
                state.userToilets = action.payload
            })
            .addCase(fetchToiletFromGoogle.fulfilled, (state, action: PayloadAction<Toilet[]>) => {
                state.googleToilets = action.payload
            })
    },
})

export const toiletReducer = toiletSlice.reducer;
export const selectToiletFromUser = (state: RootState) => state.toilet.userToilets;
export const selectToiletFromGoogle = (state: RootState) => state.toilet.googleToilets;