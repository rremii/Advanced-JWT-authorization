import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "./types";
import {fetchAllUsers} from "./UsersThunks";

type initialStateType = {
    allUsers: IUser[]
}

let initialState = {
    allUsers: []
} as initialStateType

const AuthSlice = createSlice({
    name: 'UsersSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
            state.allUsers = action.payload
        })
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
        })

    },
})
// export const {} = AuthSlice.actions
export default AuthSlice.reducer