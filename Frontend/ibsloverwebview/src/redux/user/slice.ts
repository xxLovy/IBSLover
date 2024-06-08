import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { getUser, login } from "./operations";


export interface IUser {
    username: string;
    toilets?: string[];
    favorites?: string[];
    kindeId: string;
    family_name?: string;
    given_name?: string;
    picture?: string;
    email?: string;
}

const initialState: IUser = {
    username: '',
    toilets: [],
    favorites: [],
    kindeId: '',
    family_name: '',
    given_name: '',
    picture: '',
    email: ''
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // Handle addToilet actions
            .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
                state = action.payload
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state = action.payload
            })
    },
})

export const userReducer = userSlice.reducer;
export const selectUser = (state: RootState) => state.user;