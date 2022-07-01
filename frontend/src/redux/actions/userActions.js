import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS, USERNAME_CHECK_FAIL,
    USERNAME_CHECK_REQUEST, USERNAME_CHECK_SUCCESS
} from "../constants/userConstants";
import axios from "axios";


export const userLoginAction = (authenticationData) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers : {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post('/login/', authenticationData)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch (e) {
        console.log(e)
        dispatch({
            type: USER_LOGIN_FAIL,
        })
    }
}


export const usernameCheckAction = (username) => async (dispatch) => {
    try{
        dispatch({
            type: USERNAME_CHECK_REQUEST,
        })

        const config = {
            headers: {
              'Content-type': 'application/json'
            }
        }

        const {data} = axios.get(`/chat/check-username/${username}/`, config)

        dispatch({
            type: USERNAME_CHECK_SUCCESS,
            payload: data
        })
    }catch (e) {
        console.log(e)
        dispatch({
            type: USERNAME_CHECK_FAIL,
            payload: e.response
        })
    }
}
