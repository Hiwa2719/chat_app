import {
    CHATS_LIST_FAIL,
    CHATS_LIST_REQUEST,
    CHATS_LIST_SUCCESS,
    SET_CURRENT_CHAT,
    START_CHAT_FAIL,
    START_CHAT_REQUEST,
    START_CHAT_SUCCESS,
    UPDATE_CHATS_LIST
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

        if (data.created) {
            dispatch({
                type: UPDATE_CHATS_LIST,
                payload: data
            })
        }

        dispatch({
            type: SET_CURRENT_CHAT,
            payload: data
        })


    } catch (e) {
        dispatch({
            type: START_CHAT_FAIL,
            payload: e.response
        })
    }
}