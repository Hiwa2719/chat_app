import React, {useState} from "react";
import {useSelector} from "react-redux";
import Loader from "../loader";
import Alert from "../alert";


const Contacts = () => {
    const {loading: contactLoading, contacts, error} = useSelector(state => state.userContacts)
    const [selectedContact, setSelectedContact] = useState('')

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
                         className={`ps-3 py-3 ${selectedContact === contact.id ? "item-clicked" : "sidebar-item"}`}
                         onClick={() => setSelectedContact(contact.id)}>
                        <h5>@{contact.username}</h5>
                        <div>{contact.first_name} {contact.last_name}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default Contacts
