import {
    SIGNUP_FAIL,
    SIGNUP_REQUEST,
    UPDATE_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_RESET,
    UPDATE_USER_PROFILE_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_RESET,
    USER_LOGIN_SUCCESS
} from "../constants/userConstants";
import axios from "axios";
import {CHATS_LIST_RESET} from "../constants/chatConstants";


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


export const logoutAction = () => async (dispatch) => {
    dispatch({
        type: USER_LOGIN_RESET
    })

    dispatch({
        type: CHATS_LIST_RESET
    })

    dispatch({type: UPDATE_USER_PROFILE_RESET})
}


export const updateUserProfileAction = (updateData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_USER_PROFILE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const {data} =await axios.post('/chat/update-profile/', updateData, config)

        dispatch({
            type: UPDATE_USER_PROFILE_SUCCESS
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
            payload: e.response && e.response.data ? e.response.data.errors : e.message
        })
    }
}
