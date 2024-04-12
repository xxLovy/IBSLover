import { createSlice } from '@reduxjs/toolkit'
import { fetchNearByPlacesByUser } from './operations';

const initialState = {
    places: {
        items: [],
        isLoading: false,
        error: null,
    },
}

export const userPlacesSlice = createSlice({
    name: 'userPlaces',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNearByPlacesByUser.pending, (state) => {
                console.log('fetching user places api')
                state.places.isLoading = true;
            })
            .addCase(fetchNearByPlacesByUser.fulfilled, (state, action) => {
                console.log('done')
                state.places.isLoading = false;
                state.places.items = action.payload;
            })
            .addCase(fetchNearByPlacesByUser.rejected, (state, action) => {
                console.log('failed')
                state.places.isLoading = false;
                state.places.error = action.payload;
            })
    }
})


export const userPlacesReducer = userPlacesSlice.reducer;
