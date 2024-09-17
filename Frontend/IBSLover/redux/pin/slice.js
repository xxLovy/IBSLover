import { createSlice } from '@reduxjs/toolkit'
import { fetchCurrentLocation } from './operations';

const initialState = {
    pin: {
        latitude: 0,
        longitude: 0,
        isLoading: true,
        error: null,
    },
}

export const pinSlice = createSlice({
    name: 'pin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentLocation.pending, (state) => {
                state.pin.isLoading = true;
                console.log('fetching location...3')
            })
            .addCase(fetchCurrentLocation.fulfilled, (state, action) => {
                console.log('fetched location...3')
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
