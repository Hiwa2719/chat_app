import {CHATS_LIST_FAIL, CHATS_LIST_REQUEST, CHATS_LIST_SUCCESS} from "../constants/chatConstants";
import axios from "axios";


export const getChatListAction = () => async (dispatch, getState) => {
    try{
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

        const {data} = await axios.get('chat/groups/', config)

        dispatch({
            type: CHATS_LIST_SUCCESS,
            payload: data
        })

    }catch (e) {
        console.log(e)
        dispatch({
            type: CHATS_LIST_FAIL,
            payload: e.response
        })
    }
}