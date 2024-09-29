import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIURL } from "../../../constants";
import { IUser } from "./slice";


// if a user is authenticated, check if the user exist in the DB, true: OK false: register a user to the DB
export const login = createAsyncThunk(
    "user/login",
    async ({ kindeId, username }: { kindeId: string, username: string }, thunkAPI) => {
        try {
            console.log('logging')
            const response = await fetch(`${APIURL}/user/login/${kindeId}/${username}`)
            if (!response.ok) {
                throw new Error("invalid user")
            } else {
                const user: IUser = await response.json()
                return user
            }
        } catch (err: any) {
            console.log(err)
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

export const getUser = createAsyncThunk(
    "user/getUser",
    async (kindeId: string, thunkAPI) => {
        try {
            const response = await fetch(`${APIURL}/user/getUser/${kindeId}`);
            if (!response.ok) {
                throw new Error("invalid id")
            } else {
                const user = await response.json()
                return user
            }
        } catch (err: any) {
            console.log(err)
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)