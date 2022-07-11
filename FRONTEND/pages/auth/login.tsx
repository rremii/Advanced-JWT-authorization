import React, {FC, useEffect} from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {AdaptiveValue, Rem} from "../../styles/functions/mixins";
import {Field, Form, Formik} from 'formik';
import {useRouter} from "next/router";
import {useAppDispatch, useTypedSelector} from "../../app/store/ReduxStore";
import {fetchLogin} from "../../app/store/AuthThunks";
import {useClearErrors} from "../../app/hooks/useClearErrors";

interface IValues {
    email: string
    password: string
    isRememberMe: string | null
}

type LoginType = {}

const Login: FC<LoginType> = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    let {isLoggedIn} = useTypedSelector(state => state.Auth)
    let {loginError} = useTypedSelector(state => state.Auth)

    useClearErrors() //clears login and registration errors in 5s


    useEffect(() => {
        if (isLoggedIn) router.push('/')
    }, [isLoggedIn])


    return <LoginWrapper className='login__wrapper'>

        <div className="login__container">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    isRememberMe: ''
                }}
                onSubmit={async ({email, password, isRememberMe}: IValues) => {
                    localStorage.setItem('isRememberMe', isRememberMe + '')
                    await dispatch(fetchLogin({email, password}))
                }}
            >
                <Form className='login-form'>
                    <h1 className='form-title'>Brand</h1>
                    {loginError && <div className='server-error'>
                        {loginError}
                    </div>}
                    <Field name='email' className='form-input' placeholder='EMAIL' type="email"/>
                    <Field name='password' className='form-input' placeholder='PASSWORD' type="password"/>
                    <button type='submit'>LOGIN</button>
                    <div className='form-rememberMe'>
                        <Field name='isRememberMe' type='checkbox'/>
                        <span>remember me</span>
                    </div>
                    <Link className='form-link' href='/auth/signup'>Don&apos;t have an account yet?</Link>
                </Form>
            </Formik>
        </div>
    </LoginWrapper>
};
export default Login;
const LoginWrapper = styled.div`
  background-image: url("/background.png");
  background-size: cover;
  background-position: center;
  position: relative;
  height: 100vh;

  .login__container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 350px;
      padding: 20px 30px;

      .error {
        font-weight: 600;
        color: #890101;
        font-size: ${Rem(20)};
      }

      .server-error {
        position: fixed;
        width: ${AdaptiveValue(600, 320)};
        height: 100px;
        background-color: white;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        top: -100px;
        color: #890101;
        font-size: ${Rem(25)};
        animation: appear 3s;
      }

      @keyframes appear {
        0% {
          top: -100px;
        }
        10% {
          top: 0;
        }
        90% {
          top: 0;
        }
        100% {
          top: -100px;
        }
      }

      .form-title {
        font-family: 'Kaushan Script', cursive;
        font-weight: 600;
        color: white;
        font-size: ${Rem(60)};
        margin-bottom: 75px;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.24);
      }

      .form-input {
        width: 100%;
        border: none;
        border-bottom: white 2px solid;
        color: white;
        font-weight: 600;
        background-color: transparent;
        padding: 10px 0;
        font-size: ${Rem(21)};
        margin-bottom: 10px;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.24);

        &::placeholder {
          color: white;
          font-size: ${Rem(18)};
          letter-spacing: 1px;
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.24);

        }
      }

      .form-rememberMe {
        margin-bottom: 10px;

        input {
          margin-right: 10px;
          width: 15px;
          height: 15px;
        }

        span {
          color: white;
          font-family: "Comic Sans MS";
          font-size: ${Rem(18)};
        }
      }

      button {
        margin-top: 20px;
        margin-bottom: 10px;
        width: 100%;
        background-color: white;
        color: rgb(95, 127, 146);
        box-shadow: 4px 4px 5px 0 rgba(0, 0, 0, 0.42);
        height: 60px;
        font-size: ${Rem(21)};
        font-weight: 600;
        letter-spacing: 1px;
      }

      a {
        color: white;
        font-family: "Comic Sans MS";
      }
    }
  }

`