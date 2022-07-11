import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "./types";
import {fetchCheckIsAuth, fetchLogin, fetchLogout, fetchRegistration} from "./AuthThunks";


type initialStateType = {
    isLoggedIn: boolean | null
    user: IUser
    isPending: boolean
    registrationError: string
    loginError: string

}

let initialState = {
    isLoggedIn: null,
    user: {},
    isPending: true,
    registrationError: '',
    loginError: '',
} as initialStateType

const AuthSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: {
        clearErrors(state) {
            state.registrationError = ''
            state.loginError = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRegistration.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isLoggedIn = true
            state.isPending = false
        })
        builder.addCase(fetchRegistration.rejected, (state, action) => {
            state.isLoggedIn = false
            state.registrationError = action.error.message + ''
        })
        builder.addCase(fetchLogin.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isLoggedIn = true
            state.isPending = false
        })
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.isLoggedIn = false
            state.loginError = action.error.message + ''
        })
        builder.addCase(fetchCheckIsAuth.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isLoggedIn = true
            state.isPending = false
        })
        builder.addCase(fetchCheckIsAuth.pending, (state) => {
            state.isPending = true
        })
        builder.addCase(fetchCheckIsAuth.rejected, (state, action) => {
            state.isLoggedIn = false
            state.isPending = false
            localStorage.removeItem('accessToken')
        })
        builder.addCase(fetchLogout.fulfilled, (state, action: PayloadAction<string>) => {
            state.user = {} as IUser
            state.isPending = true
            state.isLoggedIn = null
            state.registrationError = ''
            state.loginError = ''
        })
    },
})
export const {clearErrors} = AuthSlice.actions
export default AuthSlice.reducer