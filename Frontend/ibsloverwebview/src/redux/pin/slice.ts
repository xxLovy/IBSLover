import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchCurrentLocation } from './operations';

interface PinState {
    latitude: number;
    longitude: number;
    isLoading: boolean;
    error: string | null;
}

const initialState: { pin: PinState } = {
    pin: {
        latitude: 0,
        longitude: 0,
        isLoading: false,
        error: null,
    },
};

export const pinSlice = createSlice({
    name: 'pin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentLocation.pending, (state) => {
                state.pin.isLoading = true;
            })
            .addCase(
                fetchCurrentLocation.fulfilled,
                (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
                    state.pin.isLoading = false;
                    state.pin.latitude = action.payload.latitude;
                    state.pin.longitude = action.payload.longitude;
                }
            )
            .addCase(
                fetchCurrentLocation.rejected,
                (state, action: PayloadAction<string | any>) => {
                    state.pin.isLoading = false;
                    state.pin.error = action.payload ?? 'An error occurred';
                }
            );
    },
});

export const pinReducer = pinSlice.reducer;