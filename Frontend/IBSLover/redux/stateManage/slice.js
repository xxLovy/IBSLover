import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    hasListView: true,
    mapRefRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    },
    selectedMarker: null,
}

export const stateManageSlice = createSlice({
    name: 'stateManage',
    initialState,
    reducers: {
        setListView: (state) => {
            state.hasListView = !state.hasListView
        },
        setMapRefRegion: (state, action) => {
            state.mapRefRegion = action.payload
        },
        setSelectedMarker: (state, action) => {
            state.selectedMarker = action.payload
        }
    },
})

export const { setListView, setMapRefRegion, setSelectedMarker } = stateManageSlice.actions
export const stateManageReducer = stateManageSlice.reducer;
