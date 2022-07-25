import React from "react";
import '../../App.css'
import {useDispatch, useSelector} from "react-redux";
import {removeContactAction} from "../../redux/actions/userActions";
import Loader from "../loader";
import {startChatAction} from "../../redux/actions/chatsActions";


const ContactDetailModal = ({contact, setSelectedContact}) => {
    const closeHandler = () => {
        setSelectedContact('')
    }

    const dispatch = useDispatch()
    const {loading: startChatLoading} = useSelector(state => state.startChat)

    const removingHandler = (e) => {
        dispatch(removeContactAction({id: contact.id}))
        closeHandler()
    }

    const messageHandler = () => {
        dispatch(startChatAction(contact.id))
        closeHandler()
    }

    return (
        <div className="modal-prop" onClick={() => setSelectedContact('')}>
            <div className="modal-content w-25 p-3" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h5 className="modal-title">User Detail</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                            aria-label="Close" onClick={() => closeHandler()}></button>
                </div>
                <div className="mt-3">
                    <h5>Username: {contact.username}</h5>
                    <div className="mt-3">First name: {contact.first_name}</div>
                    <div>Last name: {contact.last_name}</div>
                    <div className="mt-3">
                        <button className="btn btn-danger" onClick={removingHandler}>
                            Remove from contacts
                        </button>
                        <button className="btn btn-warning ms-3" onClick={messageHandler}>
                            {startChatLoading && <Loader/>}
                            Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactDetailModal