import {NextPage} from 'next';
import {AppProps} from 'next/app';
import Head from 'next/head';
import {ReactElement} from "react";
import {Provider} from 'react-redux';
import Layout from '../app/layout/Layout';
import './../styles/style.scss'
import {store} from "../app/store/ReduxStore";

export type NextPageWithLayout<T = {}> = NextPage<T> & {
    getLayout?: (page: ReactElement) => React.ReactNode
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({Component, pageProps}: AppPropsWithLayout) {


    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)

    return <div className='MainWrapper'>
        <Head>
            <title>authorization</title>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Tapestry&display=swap"
                  rel="stylesheet"/>
        </Head>
        {getLayout(
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        )}
    </div>
}

export default MyApp

