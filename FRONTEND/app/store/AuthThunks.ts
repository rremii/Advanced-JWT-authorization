import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAuthUserData} from "./types";
import {authApi} from "../api/AuthApi";


export const fetchRegistration = createAsyncThunk(
    'AuthSlice/fetchRegistration',
    async (userData: IAuthUserData) => {
        try {
            let response = await authApi.register(userData)

            localStorage.setItem('accessToken', response.data.accessToken)
            return response.data.user
        } catch (e: any) {
            throw  e.response.data.message
        }
    }
)

export const fetchLogin = createAsyncThunk(
    'AuthSlice/fetchLogin',
    async (userData: IAuthUserData) => {
        try {
            let response = await authApi.login(userData)
            localStorage.setItem('accessToken', response.data.accessToken)
            return response.data.user
        } catch (e: any) {
            throw  e.response.data.message
        }
    }
)
export const fetchCheckIsAuth = createAsyncThunk(
    'AuthSlice/fetchCheckIsAuth',
    async () => {
        try {
            let response = await authApi.refresh()
            localStorage.setItem('accessToken', response.data.accessToken)
            return response.data.user
        } catch (e: any) {
            throw  e.response.data.message
        }
    }
)
export const fetchLogout = createAsyncThunk(
    'AuthSlice/fetchLogout',
    async (_, {dispatch}) => {
        try {
            let response = await authApi.logout()
            localStorage.removeItem('accessToken')
            dispatch(fetchCheckIsAuth())
            return response.data
        } catch (e: any) {
            throw  e.response.data.message
        }
    }
)

