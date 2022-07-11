import React from "react";
import SideBar from "../components/sidebar/sideBar";
import MessageSide from "../components/MessageSide";


const Account = () => {
    return (
        <div className="w-100 vh-100 row m-0 p-0">
            <div className="h-100 col-md-4 bg-dark p-0">
                <SideBar/>
            </div>
            <div className="col p-0 m-0">
                <MessageSide/>
            </div>
        </div>
    )
}

export default Account
