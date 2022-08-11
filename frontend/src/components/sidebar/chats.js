import React, {useState} from "react";
import SideBarItem from "./sideBarItem";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../loader";
import {SET_CURRENT_CHAT} from "../../redux/constants/chatConstants";


const Chats = () => {
    const dispatch = useDispatch()
    const {chats, loading: chatsLoading, error: chatsError} = useSelector(state => state.chats)

    const clickHandler = (chat) => {
        dispatch({
            type: SET_CURRENT_CHAT,
            payload: chat
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
                        <div key={chat.id} onClick={e => clickHandler(chat)}>
                            <SideBarItem item={chat}/>
                        </div>
                    )))
            }
        </>
    )
}

export default Chats