import { createSlice } from '@reduxjs/toolkit'
import { fetchCurrentLocation } from './operations';

const initialState = {
    places: {
        place_id: null,
        business_status: false,
        location: {
            latitude: 0,
            longitude: 0,
        },
        vicinity: '',
        types: [],
    },
    isLoading: false,
    error: null,
}

export const googlePlacesSlice = createSlice({
    name: 'googlePlaces',
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
