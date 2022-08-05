import React, {useState} from "react";
import SideBarItem from "./sideBarItem";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../loader";
import {SET_CURRENT_CHAT_ID} from "../../redux/constants/chatConstants";
import moment from "moment";


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

    const newDateFormat = (date) => {
        let dateObj = moment(date)
        return moment.utc(dateObj).local().format("YYYY-MM-DD HH:mm:ss");
    }

    return (
        <>
            {
                chatsLoading && <div className="d-flex justify-content-center align-items-center">
                    <Loader/></div>
            }

            {
                chats && (
                    chats
                        .sort(function (x){return newDateFormat(x['update'])}).reverse()
                        .map(chat => chat.messages.length >= 1 && (
                        <div key={chat.id} onClick={e => clickHandler(chat.id)}>
                            <SideBarItem item={chat}/>
                        </div>
                    )))
            }
        </>
    )
}

export default Chats