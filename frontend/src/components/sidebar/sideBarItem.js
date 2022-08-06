import React from "react";
import {useSelector} from "react-redux";


const SideBarItem = ({item}) => {
    const {messages} = item
    const {id: currentChatId} = useSelector(state => state.currentChat)

    return (
        <div className={`ps-4 pt-2 pb-1 ${currentChatId === item.id ? "item-clicked": "sidebar-item"}`}>
            <h5 className="text-light">{item.name}</h5>
            <p className="text-info">{messages[messages.length - 1].content.slice(0, 70)}</p>
        </div>
    )
}

export default SideBarItem
