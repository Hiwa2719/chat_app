import {
    CHATS_LIST_FAIL,
    CHATS_LIST_REQUEST,
    CHATS_LIST_RESET,
    CHATS_LIST_SUCCESS,
    RESET_CURRENT_CHAT,
    SET_CURRENT_CHAT,
    START_CHAT_FAIL,
    START_CHAT_REQUEST,
    START_CHAT_SUCCESS,
    UPDATE_CHAT_MESSAGES,
    UPDATE_CHATS_LIST
} from "../constants/chatConstants";

function chatsSorting(chats){
    let temp = []
    for (let index in chats) {
        let chat = chats[index]
        chat['messages'] = chat['messages'].sort((x, y)=> new Date(x['timestamp']) > new Date(y['timestamp']))
        temp.push(chat)
    }
    return temp.sort((x,y) => new Date(x['update']) < new Date(y['update']))
}

export const getChatListReducer = (state = {groups: []}, action) => {
    switch (action.type){
        case CHATS_LIST_REQUEST:
            return {loading: true, ...state}
        case CHATS_LIST_SUCCESS:
            return {loading: false, chats: chatsSorting(action.payload)}
        case CHATS_LIST_FAIL:
            return {loading: false, error: action.payload}
        case CHATS_LIST_RESET:
            return {groups: []}
        case UPDATE_CHATS_LIST:
            state.chats.push(action.payload)
            return state
        case UPDATE_CHAT_MESSAGES:
            let {chats} = state
            let chat = chats.find(function (chat){return chat['id'] === action.payload.chat})
            chats = chats.filter(function (chat){return chat['id']!== action.payload.chat})
            chat['messages'].push(action.payload.message)
            chat['update'] = Date.now()
            chats.push(chat)
            chats = chatsSorting(chats)
            return {...state, chats}
        default:
            return state
    }
}

export const setCurrentChatReducer = (state={}, action) => {
    switch (action.type) {
        case SET_CURRENT_CHAT:
            return action.payload
        case RESET_CURRENT_CHAT:
            return {}
        default:
            return state
    }
}

export const startChatReducer = (state={}, action) => {
    switch (action.type) {
        case START_CHAT_REQUEST:
            return {loading: true}
        case START_CHAT_SUCCESS:
            return {loading: false}
        case START_CHAT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
