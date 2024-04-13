import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    hasListView: true,
}

export const stateManageSlice = createSlice({
    name: 'stateManage',
    initialState,
    reducers: {
        setListView: (state) => {
            state.hasListView = !state.hasListView
        }
    },
})

export const { setListView } = stateManageSlice.actions
export const stateManageReducer = stateManageSlice.reducer;
