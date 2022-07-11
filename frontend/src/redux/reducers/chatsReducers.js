import {CHATS_LIST_FAIL, CHATS_LIST_REQUEST, CHATS_LIST_RESET, CHATS_LIST_SUCCESS} from "../constants/chatConstants";

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
