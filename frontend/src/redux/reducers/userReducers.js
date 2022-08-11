import {
    REMOVE_CONTACT_FAIL,
    REMOVE_CONTACT_REQUEST,
    REMOVE_CONTACT_SUCCESS, RESET_MODAL_USER, RESET_SELECTED_USER, SET_MODAL_USER, SET_SELECTED_USER,
    SIGNUP_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_RESET,
    UPDATE_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_RESET,
    UPDATE_USER_PROFILE_SUCCESS,
    USER_CONTACTS_FAIL,
    USER_CONTACTS_REQUEST,
    USER_CONTACTS_RESET,
    USER_CONTACTS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_RESET,
    USER_LOGIN_SUCCESS, USER_SEARCH_FAIL, USER_SEARCH_REQUEST, USER_SEARCH_RESET, USER_SEARCH_SUCCESS
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


export const removeContactReducer = (state = {}, action) => {
    switch (action.type) {
        case REMOVE_CONTACT_REQUEST:
            return {loading: true}
        case REMOVE_CONTACT_SUCCESS:
            return {loading: false, success: true}
        case REMOVE_CONTACT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const userSearchReducer = (state={}, action) => {
    switch (action.type) {
        case USER_SEARCH_REQUEST:
            return {loading: true}
        case USER_SEARCH_SUCCESS:
            return {loading: false, users: action.payload}
        case USER_SEARCH_FAIL:
            return {loading: false, error: action.payload}
        case USER_SEARCH_RESET:
            return {}
        default:
            return state
    }
}


export const selectedUserReducer = (state={}, action) => {
    switch (action.type) {
        case SET_SELECTED_USER:
            return action.payload
        case RESET_SELECTED_USER:
            return {}
        default:
            return state
    }
}


export const modalUserReducer = (state={}, action) => {
    switch (action.type) {
        case SET_MODAL_USER:
            return action.payload
        case RESET_MODAL_USER:
            return {}
        default:
            return state
    }
}
