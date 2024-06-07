import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIURL } from "../../../constants";

export const addToilet = createAsyncThunk(
    "toilet/add",
    async ({ toilet, userId }: { toilet: Toilet, userId: string }, thunkAPI) => {
        try {
            const response = await fetch(`${APIURL}/toilet/addToilet/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    toilet
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update toilet')
            } else if (response.status === 201) {
                // there are already some toilets nearby. ask user if the toilet she wants to add is from one of those
                const toiletIds = await response.json()
                console.log("There are already some toilets nearby")
            } else if (response.status == 200) {
                const data = await response.json()
                console.log('User updated successfully:', data)
                return data
            }
        } catch (err: any) {
            console.log(err)
            return thunkAPI.rejectWithValue(err.message);
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

export const editToilet = createAsyncThunk(
    "toilet/edit",
    async ({ toilet, userId }: { toilet: Toilet, userId: string }, thunkAPI) => {
        try {
            const response = await fetch(`${APIURL}/toilet/editToilet/${userId}/${toilet._id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    toilet
                })
            })
            if (!response.ok) {
                throw new Error('Failed to update toilet')
            }

            const data = await response.json()
            console.log('Toilet updated successfully:', data)
        } catch (err: any) {
            console.log(err)
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

export const removeToilet = createAsyncThunk(
    "toilet/remove",
    async ({ toiletId, userId, msg }: { toiletId: string, userId: string, msg: string }, thunkAPI) => {
        try {
            const response = await fetch(`${APIURL}/toilet/removeToilet/${userId}/${toiletId}/${msg}`)
            if (!response.ok) {
                throw new Error('Failed to remove toilet')
            }

        } catch (err: any) {
            console.log(err)
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

export const voteToilet = createAsyncThunk(
    "toilet/vote",
    async ({ toiletId, userId }: { toiletId: string, userId: string }, thunkAPI) => {
        try {
            const response = await fetch(`${APIURL}/toilet/voteToilet/${userId}/${toiletId}`)
            if (!response.ok) {
                throw new Error('Failed to remove toilet')
            }
        } catch (err: any) {
            console.log(err)
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)