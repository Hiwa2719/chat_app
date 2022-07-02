import {
    SIGNUP_FAIL,
    SIGNUP_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS
} from "../constants/userConstants";
import axios from "axios";


export const userLoginAction = (userInfo) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post('/chat/login/', userInfo, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (e) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: e.response && e.response.data ? e.response.data.detail : e.message
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
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (e) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: e.response && e.response.data ? e.response.data : e.message
        })
    }
}
