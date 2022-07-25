import {
    CHATS_LIST_FAIL,
    CHATS_LIST_REQUEST,
    CHATS_LIST_SUCCESS,
    SET_CURRENT_CHAT_ID,
    START_CHAT_FAIL,
    START_CHAT_REQUEST,
    START_CHAT_SUCCESS
} from "../constants/chatConstants";
import axios from "axios";


export const getChatListAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CHATS_LIST_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const {data} = await axios.get('/chat/chats/', config)

        dispatch({
            type: CHATS_LIST_SUCCESS,
            payload: data
        })

    } catch (e) {
        console.log(e)
        dispatch({
            type: CHATS_LIST_FAIL,
            payload: e.response
        })
    }
}


export const startChatAction = (contactId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: START_CHAT_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const {data} = await axios.post('/chat/start-chat/', {id: contactId}, config)

        dispatch({
            type: START_CHAT_SUCCESS
        })

        dispatch({
            type: SET_CURRENT_CHAT_ID,
            payload: data.chat_id
        })

        if (data.created) {
            dispatch(getChatListAction())
        }


    } catch (e) {
        dispatch({
            type: START_CHAT_FAIL,
            payload: e.response
        })
    }
}