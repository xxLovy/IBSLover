import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: User;
    isSignedIn: boolean;
}

const initialState: UserState = {
    user: {},
    isSignedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<{ user: User }>) => {
            state.user = action.payload.user;
        },
        setIsSignedIn: (state, action: PayloadAction<boolean>) => {
            state.isSignedIn = action.payload;
        },
    },
});

export const { setUserInfo, setIsSignedIn } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsSignedIn = (state: { user: UserState }) => state.user.isSignedIn;