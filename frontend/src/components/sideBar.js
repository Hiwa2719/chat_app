import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getChatListAction} from "../redux/actions/chatsActions";
import {logoutAction} from '../redux/actions/userActions'


const SideBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {groups} = useSelector(state => state.chats)
    const {userInfo} = useSelector(state => state.userLogin)

    const lockHandler = (e) => {
        dispatch(logoutAction())
        navigate('/')
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(getChatListAction())
        }
    }, [userInfo])

    return (
        <div className="bg-dark h-100 p-2">
            <div>
                <div className="row my-1 text-secondary text-center align-items-center">
                    <div className="col p-0 ms-2 ">
                        <div className="hover-light p-2">
                            <i className="fa-solid fa-bars" style={{"fontSize": "1.6rem"}}></i>
                        </div>
                    </div>
                    <div className="col-md-9 p-0 ">
                        <input type="text" className="form-control bg-secondary border-0"/>
                    </div>
                    <div className="col p-0">
                        <div className="hover-light p-2">
                            <i className="fa-solid fa-lock-open" style={{"fontSize": "1.5rem"}}
                               onClick={lockHandler}></i>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                messages/contacts/userinfo
            </div>
            <div className="h-100">
                {
                    groups.map(group => (
                        <div key={group.id}>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SideBar
