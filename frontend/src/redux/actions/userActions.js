import {
    REMOVE_CONTACT_FAIL,
    REMOVE_CONTACT_REQUEST,
    REMOVE_CONTACT_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_RESET,
    UPDATE_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_RESET,
    UPDATE_USER_PROFILE_SUCCESS,
    USER_CONTACTS_FAIL,
    USER_CONTACTS_REQUEST,
    USER_CONTACTS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_RESET,
    USER_LOGIN_SUCCESS, USER_SEARCH_FAIL,
    USER_SEARCH_REQUEST,
    USER_SEARCH_SUCCESS
} from "../constants/userConstants";
import axios from "axios";
import {CHATS_LIST_RESET, RESET_CURRENT_CHAT_ID} from "../constants/chatConstants";


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
    dispatch({type: RESET_CURRENT_CHAT_ID})
    dispatch({type: SIGNUP_RESET})
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

        const {data} = await axios.post('/chat/update-profile/', updateData, config)

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


export const getUserContactsAction = () => async (dispatch, getstate) => {
    try {
        dispatch({
            type: USER_CONTACTS_REQUEST
        })

        const {userLogin: {userInfo}} = getstate()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const {data} = await axios.get('/chat/get-contacts/', config)

        dispatch({
            type: USER_CONTACTS_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: USER_CONTACTS_FAIL,
            payload: e.response && e.response.data.errors ? e.response.data.errors : e.message
        })
    }
}


export const removeContactAction = (contact) => async (dispatch, getstate) => {
    try {
        dispatch({
            type: REMOVE_CONTACT_REQUEST
        })

        const {userLogin: {userInfo}} = getstate()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const {data} = await axios.post('/chat/remove-contact/', contact, config)

        dispatch({type: REMOVE_CONTACT_SUCCESS})

        dispatch({
            type: USER_CONTACTS_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: REMOVE_CONTACT_FAIL,
            payload: e.response && e.response.data.errors ? e.response.data.errors : e.message
        })
    }
}


export const userSearchAction = (query) => async (dispatch, getstate) => {
    try {
        dispatch({
            type: USER_SEARCH_REQUEST
        })

        const {userLogin: {userInfo}} = getstate()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const {data} = await axios.get(`/search-user/${query}/`, config)

        dispatch({
            type: USER_SEARCH_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: USER_SEARCH_FAIL,
            payload: e.response
        })
    }
}