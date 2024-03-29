import React from "react";
import '../App.css'
import {useDispatch, useSelector} from "react-redux";
import {addingContactAction, removeContactAction} from "../redux/actions/userActions";
import Loader from "./loader";
import {startChatAction} from "../redux/actions/chatsActions";
import {RESET_MODAL_USER, SET_SELECTED_USER} from "../redux/constants/userConstants";

const UserDetailModal = () => {
    const {selectedUser, contact} = useSelector(state => state.modalUser)
    const {contacts} = useSelector(state => state.userContacts)
    const dispatch = useDispatch()
    const {loading: startChatLoading} = useSelector(state => state.startChat)

    const closeHandler = () => {
        dispatch({
            type: RESET_MODAL_USER
        })
    }

    const removingHandler = (e) => {
        dispatch(removeContactAction({id: selectedUser.id}))
        closeHandler()
    }

    const messageHandler = () => {
        dispatch(startChatAction(selectedUser.id))
        dispatch({
            type: SET_SELECTED_USER,
            payload: {selectedUser: selectedUser}
        })
        closeHandler()
    }

    const addingHandler = () => {
        if (contacts) {
            const contact = contacts.find(contact => contact.id === selectedUser.id)
            if (!contact) {
                dispatch(addingContactAction({id: selectedUser.id}))
            }
        }
        closeHandler()
    }

    return (
        <>
            {
                selectedUser &&
                <div className="modal-prop" onClick={() => closeHandler()}>
                    <div className="modal-content w-25 p-3" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h5 className="modal-title">User Detail</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => closeHandler()}></button>
                        </div>
                        <div className="mt-3">
                            <h5>Username: {selectedUser.username}</h5>
                            <div className="mt-3">First name: {selectedUser.first_name}</div>
                            <div>Last name: {selectedUser.last_name}</div>
                            <div className="mt-3">
                                {contact ? (
                                    <button className="btn btn-danger" onClick={removingHandler}>
                                        Remove from contacts
                                    </button>
                                ) : (
                                    <button className="btn btn-info" onClick={addingHandler}>
                                        Add to contacts
                                    </button>
                                )}

                                <button className="btn btn-warning ms-3" onClick={messageHandler}>
                                    {startChatLoading && <Loader/>}
                                    Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UserDetailModal
