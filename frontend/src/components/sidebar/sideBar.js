import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getChatListAction} from "../../redux/actions/chatsActions";
import {logoutAction, getUserContactsAction} from '../../redux/actions/userActions'
import Profile from "./profile";
import Chats from "./chats";
import Loader from "../loader";
import Alert from "../alert";


const SideBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userInfo} = useSelector(state => state.userLogin)
    const {loading: contactsLoading, error: contactsError} = useSelector(state => state.userContacts)

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
        <div className="h-100">
            <div>
                <div className="row text-secondary text-center align-items-center py-3">
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
                <nav>
                    <div className="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-chats-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-chats" type="button" role="tab" aria-controls="nav-chats"
                                aria-selected="true" onClick={(e) => dispatch(getChatListAction())}>
                            Chats
                        </button>
                        <button className="nav-link" id="nav-contacts-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-contacts" type="button" role="tab" aria-controls="nav-contacts"
                                aria-selected="false" onClick={() => dispatch(getUserContactsAction())}>
                            {contactsLoading && <Loader/>}
                            Contacts
                        </button>
                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile"
                                aria-selected="false">Profile
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-chats" role="tabpanel"
                         aria-labelledby="nav-chats-tab">
                        <Chats/>
                    </div>
                    <div className="tab-pane fade" id="nav-contacts" role="tabpanel"
                         aria-labelledby="nav-contacts-tab">
                        {
                            contactsError && <Alert alertType="danger">{contactsError}</Alert>
                        }
                    </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel"
                         aria-labelledby="nav-profile-tab">
                        <Profile/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
