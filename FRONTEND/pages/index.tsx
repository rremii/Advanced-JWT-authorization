import Home from '../app/components/Home'
import {NextPageWithLayout} from "./_app";
import {ReactElement} from "react";
import useIsAuth from "../app/hooks/useIsAuth";


const HomePage: NextPageWithLayout = () => {


    let {isPending} = useIsAuth()


    return (
        <main>
            {isPending === false && <Home/>}
        </main>
    )
}
export default HomePage
HomePage.getLayout = function (page: ReactElement) {
    return <>
        {page}
    </>
}


