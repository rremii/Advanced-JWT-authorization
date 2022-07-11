import React, {FC, useEffect} from 'react';
import styled from "styled-components";
import {AdaptiveValue, Rem} from "../../styles/functions/mixins";
import {useRouter} from "next/router";
import {Field, Form, Formik} from "formik";
import {useAppDispatch, useTypedSelector} from "../../app/store/ReduxStore";
import * as Yup from 'yup';
import {useClearErrors} from "../../app/hooks/useClearErrors";
import {IAuthUserData} from "../../app/store/types";
import {fetchRegistration} from "../../app/store/AuthThunks";


type SignupType = {}

const Signup: FC<SignupType> = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    let {registrationError} = useTypedSelector(state => state.Auth)
    let {isLoggedIn} = useTypedSelector(state => state.Auth)

    useClearErrors() //clears login and registration errors in 5s

    useEffect(() => {
        if (isLoggedIn) router.push('/')
    }, [isLoggedIn])


    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(5, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required'),
    });

    return <SignupWrapper className='signup__wrapper'>
        <div className="signup__container">
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values: IAuthUserData) => {
                    await dispatch(fetchRegistration(values))
                }}
            >
                {({touched, errors}) =>
                    <Form className='signup-form'>
                        <h1 className='form-title'>Brand</h1>

                        {registrationError && <div className='server-error'> {registrationError}</div>}

                        <Field name='email' className='form-input' placeholder='EMAIL' type="email"/>
                        {touched.email && errors.email ? <div className='error'>{errors.email}</div> : null}
                        <Field name='password' className='form-input' placeholder='PASSWORD' type="password"/>
                        {touched.password && errors.password ? <div className='error'>{errors.password}</div> : null}

                        <button type='submit'>CREATE ACCOUNT</button>
                    </Form>}
            </Formik>
        </div>
    </SignupWrapper>
};
export default Signup;
const SignupWrapper = styled.div`
  background-image: url("/background.png");
  background-size: cover;
  background-position: center;
  position: relative;
  height: 100vh;

  .signup__container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .signup-form {
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

      button {
        margin-top: 20px;
        margin-bottom: 20px;
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