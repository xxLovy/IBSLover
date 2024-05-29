import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchCurrentLocation } from './operations';
import { RootState } from '../store';

interface PinState {
    latitude: number;
    longitude: number;
    isLoading: boolean;
    error: string | null;
    success: boolean;
}


const initialState: { pin: PinState } = {
    pin: {
        latitude: 37.7749,
        longitude: -122.4194,
        isLoading: false,
        error: null,
        success: false
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
                    state.pin.success = true
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

export const selectCurrentLocation = (state: RootState) => state.pin.pin;
export const selectIsLoading = (state: RootState) => state.pin.pin.isLoading;
export const selectError = (state: RootState) => state.pin.pin.error;
export const selectSuccess = (state: RootState) => state.pin.pin.success
