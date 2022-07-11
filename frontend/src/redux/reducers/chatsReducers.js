import {
    CHATS_LIST_FAIL,
    CHATS_LIST_REQUEST,
    CHATS_LIST_RESET,
    CHATS_LIST_SUCCESS, RESET_CURRENT_CHAT_ID,
    SET_CURRENT_CHAT_ID
} from "../constants/chatConstants";

export const getChatListReducer = (state = {groups: []}, action) => {
    switch (action.type){
        case CHATS_LIST_REQUEST:
            return {loading: true, ...state}
        case CHATS_LIST_SUCCESS:
            return {loading: false, chats: action.payload}
        case CHATS_LIST_FAIL:
            return {loading: false, error: action.payload}
        case CHATS_LIST_RESET:
            return {groups: []}
        default:
            return state
    }
}

export const setCurrentChatIdReducer = (state={}, action) => {
    switch (action.type) {
        case SET_CURRENT_CHAT_ID:
            return {id: action.payload}
        case RESET_CURRENT_CHAT_ID:
            return {}
        default:
            return state
    }
}
