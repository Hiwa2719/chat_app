import React from "react";


const SideBarItem = ({item, clicked}) => {
    const {messages} = item

    const clickHandler = (e)=> {

    }
    return (
        <div className={`ps-4 pt-2 pb-1 ${clicked === item.id ? "item-clicked": "sidebar-item"}`} onClick={clickHandler()}>
            <h5 className="text-light">{item.name}</h5>
            <p className="text-info">{messages[messages.length - 1].content}</p>
        </div>
    )
}

export default SideBarItem
