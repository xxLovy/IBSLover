import { createAsyncThunk } from '@reduxjs/toolkit'
import * as Location from 'expo-location';

export const fetchCurrentLocation = createAsyncThunk(
    'pin/fetchCurrentLocation',
    async (pin, thunkAPI) => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return thunkAPI.rejectWithValue('Location permission denied');
            }
            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            return location
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

