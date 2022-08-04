import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import moment from "moment";


const MessageSide = () => {
    const {userInfo} = useSelector(state => state.userLogin)
    const {chats} = useSelector(state => state.chats)
    const {id: currentChatId} = useSelector(state => state.currentChat)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [chatSocket, setChatSocket] = useState(false)


    useEffect(() => {
        if (chats && currentChatId) {
            const chat = chats.find(chat => chat.id === currentChatId)
            if (chat) {
                setMessages(chat.messages)
            }
        if (!chatSocket) {
            newChatSocket()
        }
        }
    }, [currentChatId, chats])

    const newChatSocket = () => {
        setChatSocket(new WebSocket(
            'ws://'
            + '127.0.0.1:8000'
            + '/ws/chat/lobby/'
            + '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYyMTExNzIwLCJpYXQiOjE2NTk1MTk3MjAsImp0aSI6IjRlY2Q0NzVmZDk4ODQwZjQ5M2E0YjY4N2ZhYzJmMjBiIiwidXNlcl9pZCI6NDV9.8c7Cg07VBq0UAVPBd4TkvR8grpKkmyOPmz-TuBLvWdg'
        ))
    }

    const newDateFormat = (date) => {
        let dateObj = moment(date)
        return moment.utc(dateObj).local().format("YYYY-MM-DD HH:mm:ss");
    }

    const enterHandler = (e) => {
        if (e.keyCode === 13) {  // enter, return
            sendMessage()
            setNewMessage('')
        }
    }

    const sendMessage = () => {
        if (currentChatId) {
            chatSocket.send(JSON.stringify({
                'message': newMessage,
                command: 'new_message',
                chat: currentChatId,
            }));
        }

    }

    // chatSocket.onmessage = function (e) {
    //     const data = JSON.parse(e.data);
    //     console.log('message')
    // };

    return (
        <div className="message-side w-100 h-100">
            <div className="h-100 pb-5 pt-3">
                {
                    messages && (
                        messages.map(message => (
                            <div key={message.id}
                                 className={`w-25 rounded-1 m-3 p-3 ${message.author === userInfo.username ? "bg-warning" : "bg-info  ms-auto"}`}>
                                <p>{message.content}</p>
                                <div className="small text-end">{newDateFormat(message.timestamp)}</div>
                            </div>
                        ))
                    )
                }
            </div>
            <div className="position-fixed bottom-0 w-100">
                <input type="text" className="w-100 p-2 ps-3" placeholder="Enter your thoughts here" value={newMessage}
                       onChange={(e) => setNewMessage(e.target.value)} onKeyUp={enterHandler}/>
            </div>
        </div>
    )
}

export default MessageSide
