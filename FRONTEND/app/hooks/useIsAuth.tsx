import {useRouter} from "next/router";
import {useEffect} from "react";
import {useAppDispatch, useTypedSelector} from "../store/ReduxStore";
import {fetchCheckIsAuth} from "../store/AuthThunks";

const useIsAuth = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()


    const {isLoggedIn} = useTypedSelector(state => state.Auth)
    const {isPending} = useTypedSelector(state => state.Auth)

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) router.push('./auth/login')
        if (isLoggedIn !== true && localStorage.getItem('accessToken')) {
            dispatch(fetchCheckIsAuth())
        }
    }, [dispatch])
    useEffect(() => {
        if (isLoggedIn === false) router.push('./auth/login')
    }, [dispatch, isLoggedIn])

    return ({isPending})
}
export default useIsAuth

// HomePage.getInitialProps = wrapper.getInitialPageProps(({dispatch}) =>
//
//
//     async () => {
//         await dispatch(await fetchCheckIsAuth());
//     }
// );