import { createAsyncThunk } from '@reduxjs/toolkit'

export const operation = createAsyncThunk(
    'name/name',
    async (pin, thunkAPI) => {
        try {
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

