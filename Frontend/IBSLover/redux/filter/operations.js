import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
const api = 'http://13.238.182.211:80';

export const fetchKeywords = createAsyncThunk(
    'filter/fetchKeywords',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${api}/fetchKeywords`);
            return response.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

