import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment'
import {updateUserProfileAction} from "../../redux/actions/userActions";
import Alert from "../alert";
import Loader from "../loader";


const Profile = () => {
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.userLogin)
    const {
        loading: updateLoading,
        success: updateSuccess,
        error: updateError
    } = useSelector(state => state.updateProfile)
    const [username, setUsername] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo.username)
            setFname(userInfo.first_name)
            setLname(userInfo.last_name)
            setEmail(userInfo.email)
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserProfileAction({
            username: username,
            first_name: fname,
            last_name: lname,
            email: email
        }))
    }

    const newDateFormat = (date) => {
        let dateObj = moment(date)
        return moment.utc(dateObj).local().format("YYYY-MM-DD HH:mm:ss");
    }

    return (
        <div className="p-5 mx-5 text-light">
            {
                updateSuccess && (<Alert alertType="success">
                    Your profile is now update
                </Alert>)
            }

            {
                updateError && (
                    <Alert alertType="danger">
                        {updateError}
                    </Alert>
                )
            }

            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">User Name</label>
                    <input type="text" className="form-control border-0 bg-info" id="username"
                           value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="fname" className="form-label">First Name</label>
                    <input type="text" className="form-control border-0 bg-info" id="fname"
                           value={fname} onChange={(e) => setFname(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lname" className="form-label">Last Name</label>
                    <input type="text" className="form-control border-0 bg-info" id="lname" value={lname}
                           onChange={(e) => setLname(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control border-0 bg-info" id="email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="last-login" className="form-label">Last login</label>
                    <input type="text" className="form-control border-0 bg-info" id="last-login"
                           value={userInfo && newDateFormat(userInfo.last_login)} disabled/>
                </div>
                <div className="mb-3">
                    <label htmlFor="join-date" className="form-label">join date</label>
                    <input type="text" className="form-control border-0 bg-info" id="join-date"
                           value={userInfo && newDateFormat(userInfo.date_joined)} disabled/>
                </div>
                <button type="submit" className="btn btn-primary">
                    {
                        updateLoading && <Loader/>
                    }
                    Update</button>
            </form>
        </div>
    )
}

export default Profile