import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIURL } from "../../../constants";



export const addToilet = createAsyncThunk(
    "toilet/add",
    async (toilet: Toilet, thunkAPI) => {
        try {

        } catch (error) {

        }
    }
)



export const fetchToiletFromUser = createAsyncThunk(
    "toilet/user",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${APIURL}/normal/getUserCreatedToilets`)
            const toilets: Toilet[] = await response.json()
            return toilets
        } catch (err: any) {
            console.log(err)
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

export const fetchToiletFromGoogle = createAsyncThunk(
    "toilet/google",
    async (location: location, thunkAPI) => {
        try {
            const response = await fetch(`${APIURL}/normal/getGooglePlaces?location=${location.latitude},${location.longitude}`)
            const toilets: Toilet[] = await response.json()
            return toilets
        } catch (err: any) {
            console.log(err)
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)