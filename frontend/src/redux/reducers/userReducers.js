import {
    SIGNUP_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_RESET,
    UPDATE_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_RESET,
    UPDATE_USER_PROFILE_SUCCESS, USER_CONTACTS_FAIL, USER_CONTACTS_REQUEST, USER_CONTACTS_RESET, USER_CONTACTS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_RESET,
    USER_LOGIN_SUCCESS
} from "../constants/userConstants";


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading: true}
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        case USER_LOGIN_RESET:
            localStorage.removeItem('userInfo')
            return {}
        default:
            return state
    }
}


export const signupReducer = (state = {}, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {loading: true}
        case SIGNUP_FAIL:
            return {loading: false, error: action.payload.errors}
        case SIGNUP_RESET:
            return {}
        default:
            return state
    }
}


export const updateUserProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_PROFILE_REQUEST:
            return {loading: true}
        case UPDATE_USER_PROFILE_SUCCESS:
            return {loading: false, success: true}
        case UPDATE_USER_PROFILE_FAIL:
            return {loading: false, error: action.payload}
        case UPDATE_USER_PROFILE_RESET:
            return {}
        default:
            return state
    }
}


export const getUserContactsReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CONTACTS_REQUEST:
            return {loading: true}
        case USER_CONTACTS_SUCCESS:
            return {loading: false, contacts: action.payload}
        case USER_CONTACTS_FAIL:
            return {loading: false, error: action.payload}
        case USER_CONTACTS_RESET:
            return {}
        default:
            return state
    }
}
