import { createSlice } from '@reduxjs/toolkit'
import { fetchGoogleMaps } from './operations';

const initialState = {
    places: {
        items: [],
        isLoading: false,
        error: null,
    },
}

export const googlePlacesSlice = createSlice({
    name: 'googlePlaces',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoogleMaps.pending, (state) => {
                console.log('fetching Google maps api')
                state.places.isLoading = true;
            })
            .addCase(fetchGoogleMaps.fulfilled, (state, action) => {
                console.log('done')
                state.places.isLoading = false;
                state.places.items = action.payload;
            })
            .addCase(fetchGoogleMaps.rejected, (state, action) => {
                console.log('failed')
                state.places.isLoading = false;
                state.places.error = action.payload;
            })
    }
})


export const googlePlacesReducer = googlePlacesSlice.reducer;
