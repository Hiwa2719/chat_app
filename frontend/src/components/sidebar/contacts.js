import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../loader";
import Alert from "../alert";
import {SET_MODAL_USER} from "../../redux/constants/userConstants";


const Contacts = () => {
    const dispatch = useDispatch()
    const {loading: contactLoading, contacts, error} = useSelector(state => state.userContacts)
    const {selectedUser} = useSelector(state => state.selectedUser)

    const setSelectedUser = (contact) => {
        dispatch({
            type: SET_MODAL_USER,
            payload: {selectedUser: contact, contact: true}
        })
    }

    return (
        <div className="text-light pt-3">
            {
                contactLoading && <div className="d-flex justify-content-center align-items-center">
                    <Loader/></div>
            }

            {
                error && <Alert alertType="danger">{error}</Alert>
            }

            {
                contacts &&
                contacts.map(contact => (
                    <div key={contact.id}
                         className={`ps-3 py-3 ${ selectedUser && selectedUser.id === contact.id ? "item-clicked" : "sidebar-item"}`}
                         onClick={() => setSelectedUser(contact)}>
                        <h5>@{contact.username}</h5>
                        <div>{contact.first_name} {contact.last_name}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default Contacts
