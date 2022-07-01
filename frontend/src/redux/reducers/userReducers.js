import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT, USERNAME_CHECK_FAIL,
    USERNAME_CHECK_REQUEST, USERNAME_CHECK_SUCCESS
} from "../constants/userConstants";


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading: true}
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}


export const usernameCheckReducer = (state = {}, action) => {
    switch (action.type) {
        case USERNAME_CHECK_REQUEST:
            return {loading: true}
        case USERNAME_CHECK_SUCCESS:
            return {loading: false, success: true}
        case USERNAME_CHECK_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}