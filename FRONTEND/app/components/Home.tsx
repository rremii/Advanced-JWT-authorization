import React, {FC, useEffect} from 'react';
import styled from "styled-components";
import {useAppDispatch, useTypedSelector} from "../store/ReduxStore";
import {fetchAllUsers} from "../store/UsersThunks";
import {fetchLogout} from "../store/AuthThunks";


type HomeType = {}
const Home: FC<HomeType> = () => {
    const dispatch = useAppDispatch()

    let currentUser = useTypedSelector(state => state.Auth.user)
    let allUsers = useTypedSelector(state => state.Users.allUsers)

    useEffect(() => {
        if (currentUser.role === "ADMIN") {
            dispatch(fetchAllUsers())
        }
    }, [])


    const Logout = () => {
        dispatch(fetchLogout())
    }

    return <HomeWrapper className='home__wrapper'>
        <div className="home__container">
            {currentUser.role !== "ADMIN" && <div>
                in order to see all the users log in like an admin,<br/>
                to see admin login data activate your email
            </div>}
            {currentUser.isActivated && <div>
                admin data: <br/>
                email: admin@admin <br/>
                password: admin
            </div>}
            <div>
                your data <br/>
                id : {currentUser.user_id} <br/>
                email : {currentUser.email} <br/>
                role : {currentUser.role} <br/>
                is email activated : {currentUser.isActivated ? 'yes' : 'no'}
            </div>
            <div>
                <button onClick={Logout}>logout</button>
            </div>
            {currentUser.role === "ADMIN" && allUsers.map(({user_id, password, email, role}) => {
                return <div key={user_id}>
                    id: {user_id} <br/>
                    password: {password} <br/>
                    email: {email} <br/>
                    role: {role} <br/>
                </div>
            })}
        </div>
    </HomeWrapper>
};
export default Home;

const HomeWrapper = styled.div`
  background-color: aqua;

  .home__container {
    div {
      margin-bottom: 20px;
    }

    button {
      border: black solid 1px;
    }

  }
`