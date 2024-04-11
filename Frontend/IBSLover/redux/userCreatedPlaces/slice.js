import { createSlice } from '@reduxjs/toolkit'
import { fetchCurrentLocation } from './Operations';

const initialState = {
    latitude: 0,
    longitude: 0,
    isLoading: false,
    error: null,
}

export const pinSlice = createSlice({
    name: 'pin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentLocation.pending, (state) => {
                state.pin.isLoading = true;
            })
            .addCase(fetchCurrentLocation.fulfilled, (state, action) => {
                state.pin.isLoading = false;
                state.pin.longitude = action.payload.coords.longitude;
                state.pin.latitude = action.payload.coords.latitude;
            })
            .addCase(fetchCurrentLocation.rejected, (state, action) => {
                state.pin.isLoading = false;
                state.pin.error = action.payload;
            })
    }
})


export const pinReducer = pinSlice.reducer;
export const { setFilter } = pinSlice.actions;
