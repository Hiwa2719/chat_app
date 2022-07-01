import {
    SIGNUP_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS
} from "../constants/userConstants";
import axios from "axios";


export const userLoginAction = (authenticationData) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post('/login/', authenticationData)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (e) {
        console.log(e)
        dispatch({
            type: USER_LOGIN_FAIL,
        })
    }
}


export const signupAction = (userInfo) => async (dispatch) => {
    try {
        dispatch({
            type: SIGNUP_REQUEST,
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post(`/chat/signup/`, userInfo, config)

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: e.response && e.response.data ? e.response.data : e.message
        })
    }
}
