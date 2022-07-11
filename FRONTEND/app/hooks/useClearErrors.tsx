import {useEffect} from "react";
import {clearErrors} from "../store/AuthSlice";
import {useAppDispatch, useTypedSelector} from "../store/ReduxStore";

export const useClearErrors = () => {
    const dispatch = useAppDispatch()
    const {registrationError} = useTypedSelector(state => state.Auth)
    const {loginError} = useTypedSelector(state => state.Auth)

    useEffect(() => {
        if (registrationError || loginError) {
            let timeout = setTimeout(() => {
                dispatch(clearErrors())
            }, 3000)
            return () => clearTimeout(timeout)
        }
    }, [registrationError, loginError])
}