import {createAsyncThunk} from "@reduxjs/toolkit";
import {usersApi} from "../api/UsersApi";

export const fetchAllUsers = createAsyncThunk(
    'UsersSlice/fetchAllUsers',
    async () => {
        try {

            let response = await usersApi.getAllUsers()
            return response.data
        } catch (e: any) {
            throw  e.response.data.message
        }
    }
)
