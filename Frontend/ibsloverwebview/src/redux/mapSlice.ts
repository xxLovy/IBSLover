import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MapState {
    mapRef: google.maps.Map | null;
}

const initialState: MapState = {
    mapRef: null,
};

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMapRef(state, action: PayloadAction<google.maps.Map | null>) {
            state.mapRef = action.payload;
        },
    },
});

export const { setMapRef } = mapSlice.actions;

export default mapSlice.reducer;
