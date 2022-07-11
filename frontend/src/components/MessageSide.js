import React from "react";
import {useSelector} from "react-redux";


const MessageSide = ({messages}) => {
    const {userInfo} = useSelector(state => state.userLogin)
    return (
        <div className="message-side w-100 h-100">
            <div className="h-100 pb-5">
                {
                    messages && (
                        messages.map(message => (
                            <div className={`${message.author === userInfo.username ? "bg-warning": "bg-info"}`}></div>
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
