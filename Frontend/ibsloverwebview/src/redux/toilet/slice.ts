import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { addToilet, editToilet, fetchToiletFromGoogle, fetchToiletFromUser, removeToilet, voteToilet } from "./operations"
import { RootState } from "../store"


interface IToiletState {
    userToilets: Toilet[];
    googleToilets: Toilet[];
    loading: boolean;
    error: string | null;
    voting: boolean;
    selectedToiletIds: string[];
    addSuccess: boolean;
    editSuccess: boolean;
    voteSuccess: boolean;
    removeSuccess: boolean;
}

const initialState: IToiletState = {
    userToilets: [],
    googleToilets: [],
    loading: false,
    error: null,
    voting: false,
    selectedToiletIds: [],
    addSuccess: false,
    editSuccess: false,
    voteSuccess: false,
    removeSuccess: false
};

export const toiletSlice = createSlice({
    name: "toilet",
    initialState,
    reducers: {
        setAddToastFalse: (state) => {
            state.addSuccess = false;
        },
        setEditToastFalse: (state) => {
            state.editSuccess = false;
        },
        setVoteToastFalse: (state) => {
            state.voteSuccess = false;
        },
        setRemoveToastFalse: (state) => {
            state.removeSuccess = false;
        }
    },
    extraReducers(builder) {
        builder
            // Handle addToilet actions
            .addCase(addToilet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToilet.fulfilled, (state, action: PayloadAction<Toilet | string[]>) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.voting = true
                    state.selectedToiletIds = state.selectedToiletIds.concat(action.payload)
                } else {
                    // state.userToilets.push(action.payload as Toilet);
                    state.addSuccess = true
                }
            })
            .addCase(addToilet.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || "Failed to add toilet";
            })

            // Handle fetchToiletFromUser actions
            .addCase(fetchToiletFromUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchToiletFromUser.fulfilled, (state, action: PayloadAction<Toilet[]>) => {
                state.loading = false;
                state.userToilets = action.payload;
            })
            .addCase(fetchToiletFromUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch user toilets";
            })

            // Handle fetchToiletFromGoogle actions
            .addCase(fetchToiletFromGoogle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchToiletFromGoogle.fulfilled, (state, action: PayloadAction<Toilet[]>) => {
                state.loading = false;
                state.googleToilets = action.payload;
            })
            .addCase(fetchToiletFromGoogle.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch toilets from Google";
            })

            // Handle editToilet actions
            .addCase(editToilet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editToilet.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.editSuccess = true;
            })
            .addCase(editToilet.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || "Failed to update toilet";
            })

            // Handle removeToilet actions
            .addCase(removeToilet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeToilet.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.userToilets = state.userToilets.filter(toilet => toilet._id !== action.payload);
                state.removeSuccess = true
            })
            .addCase(removeToilet.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || "Failed to remove toilet";
            })

            // Handle voteToilet actions
            .addCase(voteToilet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(voteToilet.fulfilled, (state) => {
                state.loading = false;
                state.voting = false
                state.voteSuccess = true;
            })
            .addCase(voteToilet.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || "Failed to vote toilet";
                state.voting = false
            });
    },
})

export const toiletReducer = toiletSlice.reducer;
export const { setAddToastFalse, setEditToastFalse, setVoteToastFalse, setRemoveToastFalse } = toiletSlice.actions
export const selectToiletFromUser = (state: RootState) => state.toilet.userToilets;
export const selectSelectedToilets = (state: RootState) => state.toilet.selectedToiletIds;
export const selectToiletFromGoogle = (state: RootState) => state.toilet.googleToilets;
export const selectToiletLoading = (state: RootState) => state.toilet.loading;
export const selectToiletError = (state: RootState) => state.toilet.error;
export const selectAddSuccess = (state: RootState) => state.toilet.addSuccess;
export const selectEditSuccess = (state: RootState) => state.toilet.editSuccess;
export const selectVoteSuccess = (state: RootState) => state.toilet.voteSuccess;
export const selectRemoveSuccess = (state: RootState) => state.toilet.removeSuccess;
