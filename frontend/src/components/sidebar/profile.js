import React, {useState} from "react";
import {useSelector} from "react-redux";
import moment from 'moment'


const Profile = () => {

    const {userInfo} = useSelector(state => state.userLogin)
    const [username, setUsername] = useState(userInfo.username)
    const [fname, setFname] = useState(userInfo.first_name)
    const [lname, setLname] = useState(userInfo.last_name)
    const [email, setEmail] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

    }
    const newDateFormat = (date) => {
        let dateObj = moment(date)
        return moment.utc(dateObj).local().format("YYYY-MM-DD HH:mm:ss");
    }

    return (
        <div className="p-5 mx-5 text-light">
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">User Name</label>
                    <input type="text" className="form-control border-0 bg-info" id="username"
                           value={username}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="fname" className="form-label">First Name</label>
                    <input type="text" className="form-control border-0 bg-info" id="fname"
                           value={fname}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lname" className="form-label">Last Name</label>
                    <input type="text" className="form-control border-0 bg-info" id="lname" value={lname}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control border-0 bg-info" id="email" value={email}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="last-login" className="form-label">Last login</label>
                    <input type="text" className="form-control border-0 bg-info" id="last-login"
                           value={newDateFormat(userInfo.last_login)} disabled/>
                </div>
                <div className="mb-3">
                    <label htmlFor="join-date" className="form-label">join date</label>
                    <input type="text" className="form-control border-0 bg-info" id="join-date"
                           value={newDateFormat(userInfo.date_joined)} disabled/>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}

export default Profile