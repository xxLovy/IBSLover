import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    isSignedin: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.user = action.payload.user;
        },
        setIsSignedin: (state, action) => {
            state.isSignedin = action.payload
        }
    },
})


export const userReducer = userSlice.reducer;
export const { setUserInfo, setIsSignedin } = userSlice.actions;
