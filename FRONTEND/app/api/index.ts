import axios from "axios"
import {IAuthResponse} from "../store/types";

export const API_URL = "http://localhost:5000/api/"

export const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

instance.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
        config.headers.IsRemember = localStorage.getItem('isRememberMe') + ''
    }
    return config
})
instance.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get<IAuthResponse>(API_URL + 'refresh', {withCredentials: true})
            localStorage.setItem('accessToken', response.data.accessToken)
            return instance.request(originalRequest)
        } catch (e) {
            localStorage.removeItem('accessToken')
            console.log("not logged in")
        }
    }
    throw error
})

