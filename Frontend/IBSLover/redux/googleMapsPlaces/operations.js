import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchGoogleMaps = createAsyncThunk(
    'toilets/fetchGoogleMaps',
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

