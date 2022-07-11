import React, {useState} from "react";
import SideBarItem from "./sideBarItem";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../loader";
import {SET_CURRENT_CHAT_ID} from "../../redux/constants/chatConstants";


const Chats = () => {
    const dispatch = useDispatch()
    const [clicked, setClicked] = useState('')
    const {chats, loading: chatsLoading, error: chatsError} = useSelector(state => state.chats)

    const clickHandler = (id) => {
        dispatch({
            type: SET_CURRENT_CHAT_ID,
            payload: id
        })
    }

    return (
        <>
            {
                chatsLoading && <div className="d-flex justify-content-center align-items-center">
                    <Loader/></div>
            }

            {
                chats && (
                    chats.map(chat => chat.messages.length >= 1 && (
                        <div key={chat.id} onClick={e => clickHandler(chat.id)}>
                            <SideBarItem item={chat}/>
                        </div>
                    )))
            }
        </>
    )
}

export default Chats