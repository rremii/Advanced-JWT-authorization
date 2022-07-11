import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import AuthSlice from "./AuthSlice";
import UsersSlice from "./UsersSlice";

export const store = configureStore({
    reducer: {
        Auth: AuthSlice,
        Users: UsersSlice,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
//
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector


////////code below is for learning purposes
// export const makeStore = () => configureStore({
//     reducer: {
//         Auth: AuthSlice,
//         Users: UsersSlice,
//     }
// });
// type Store = ReturnType<typeof makeStore>;
//
// export type AppDispatch = Store['dispatch'];
// export type RootState = ReturnType<Store['getState']>;
//
// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
//
//
// export const wrapper = createWrapper(makeStore, {debug: true});

