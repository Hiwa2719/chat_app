import React, {createRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {UPDATE_CHAT_MESSAGES} from "../redux/constants/chatConstants";


const MessageSide = () => {
    const dispatch = useDispatch()

    const {userInfo} = useSelector(state => state.userLogin)
    const {chats} = useSelector(state => state.chats)
    const inputRef = createRef()
    const {id: currentChatId} = useSelector(state => state.currentChat)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [chatSocket, setChatSocket] = useState(false)
    const [selectedUser, setSelectedUser] = useState('')
    const {members} = useSelector(state => state.currentChat)

    useEffect(() => {
        if (chats && currentChatId) {
            inputRef.current.focus()
            const chat = chats.find(chat => chat.id === currentChatId)
            if (chat) {
                setMessages(chat.messages)
            }
            if (!chatSocket && userInfo) {
                newChatSocket()
            }
        }
        if (members){
            const otherSide = members.find(member => member.username !== userInfo.username)
            setSelectedUser(otherSide)
        }
    }, [currentChatId, chats, userInfo])

    const newChatSocket = () => {
        const domain = window.location.host
        console.log(domain)
        setChatSocket(new WebSocket(
            'ws://'
            + domain
            + '/ws/chat/'
            + `?token=${userInfo.access}`
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

    if (chatSocket) {
        chatSocket.onmessage = function (e) {
            const data = JSON.parse(e.data);
            dispatch({
                type: UPDATE_CHAT_MESSAGES,
                payload: data
            })
        };

        chatSocket.onclose = function (e) {
            console.error('Chat socket closed unexpectedly');
        };
    }

    return (
        <div className="message-side">
            <div className="position-fixed w-100 bg-dark text-light p-3" style={{zIndex: 90}}>
                {selectedUser && selectedUser.username}
            </div>
            <div className="pb-5 pt-5 overflow-auto position-absolute top-0 w-100" style={{maxHeight: '100vh'}}>
                {
                    messages && (
                        messages
                            .map(message => (
                                    <div key={message.id}
                                         className={`w-25 rounded-1 m-3 p-3 ${message.author === userInfo.username ? "bg-warning" : "bg-info  ms-auto"}`}>
                                        <p>{message.content}</p>
                                        <div className="small text-end">{newDateFormat(message.timestamp)}</div>
                                    </div>
                                )
                            )
                    )
                }
            </div>
            <div className="position-fixed bottom-0 w-100">
                <input type="text" className="w-100 p-2 ps-3" placeholder="Enter your thoughts here" value={newMessage}
                       onChange={(e) => setNewMessage(e.target.value)} onKeyUp={enterHandler}
                ref={inputRef}/>
            </div>
        </div>
    )
}

export default MessageSide
