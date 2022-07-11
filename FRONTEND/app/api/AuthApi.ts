import axios from "axios"
import {IAuthResponse, IAuthUserData} from "../store/types";
import {API_URL, instance} from "./index";


export const authApi = {
    register: (user: IAuthUserData) => {
        return instance.post<IAuthResponse>(`registration`, user)
    },
    login: (user: IAuthUserData) => {
        return instance.post<IAuthResponse>(`login`, user)
    },
    refresh: () => {
        return axios.get<IAuthResponse>(API_URL + 'refresh', {
            withCredentials: true, headers: {
                IsRemember: localStorage.getItem('isRememberMe') + ''
            }
        })
    },
    logout: () => {
        return instance.post<string>(`logout`, {withCredentials: true})
    },
}
