import React, {useState} from "react";
import SideBarItem from "./sideBarItem";
import {useSelector} from "react-redux";
import Loader from "../loader";


const Chats = () => {
    const [clicked, setClicked] = useState('')
    const {chats, loading: chatsLoading, error: chatsError} = useSelector(state => state.chats)
    return (
        <>
            {
                chatsLoading && <div className="d-flex justify-content-center align-items-center">
                    <Loader/></div>
            }

            {
                chats && (
                    chats.map(chat => chat.messages.length >= 1 && (
                        <div key={chat.id} onClick={(e) => setClicked(chat.id)}>
                            <SideBarItem item={chat} clicked={clicked}/>
                        </div>
                    )))
            }
        </>
    )
}

export default Chats