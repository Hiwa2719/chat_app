import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import moment from "moment";


const MessageSide = () => {
    const {userInfo} = useSelector(state => state.userLogin)
    const {chats} = useSelector(state => state.chats)
    const {id: currentChatId} = useSelector(state => state.currentChat)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (chats && currentChatId) {
            const chat = chats.find(chat => chat.id === currentChatId)
            setMessages(chat.messages)
        }
    }, [currentChatId, chats])

        const newDateFormat = (date) => {
        let dateObj = moment(date)
        return moment.utc(dateObj).local().format("YYYY-MM-DD HH:mm:ss");
    }

    return (
        <div className="message-side w-100 h-100">
            <div className="h-100 pb-5 pt-3">
                {
                    messages && (
                        messages.map(message => (
                            <div key={message.id} className={`w-25 rounded-1 m-3 p-3 ${message.author === userInfo.username ? "bg-warning" : "bg-info"}`}>
                                <p>{message.content}</p>
                                <div className="small text-end">{newDateFormat(message.timestamp)}</div>
                            </div>
                        ))
                    )
                }
            </div>
            <div className="position-fixed bottom-0 w-100">
                <input type="text" className="w-100 p-2 ps-3" placeholder="Enter your thoughts here"/>
            </div>
        </div>
    )
}

export default MessageSide
