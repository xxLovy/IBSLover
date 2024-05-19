import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { api } from '../../global';

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

