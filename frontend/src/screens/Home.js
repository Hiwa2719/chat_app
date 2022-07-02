import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {userLoginAction} from "../redux/actions/userActions";
import Loader from "../components/loader";
import Alert from "../components/alert";

const Home = () => {
    const dispatch = useDispatch()
    const {loading, error, userInfo} = useSelector(state => state.userLogin)
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [emptyField, setEmptyField] = useState(false)

    useEffect(() => {
        if (userInfo) {
            navigate('/account/')
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (!username || !password) {
            setEmptyField(true)
        } else {
            dispatch(userLoginAction({username, password}))
        }
    }

    const usernameHandler = (e) => {
        setUsername(e.target.value)
        setEmptyField(false)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        setEmptyField(false)
    }

    return (
        !userInfo &&
        <div className="d-flex align-items-center justify-content-center w-100 vh-100">
            <div className="w-25 text-start mt-5 h-75">
                <h1 className="mb-5">Login</h1>
                <form onSubmit={submitHandler}>
                    {
                        error && (
                            <Alert alertType="danger">
                                {error}
                            </Alert>
                        )
                    }
                    {
                        emptyField && (
                            <Alert alertType="danger">
                                Both fields should be populated with you credentials
                            </Alert>
                        )
                    }

                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="username" placeholder="User Name"
                               onChange={usernameHandler}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                               placeholder="Password" onChange={passwordHandler}/>
                    </div>
                    <button type="submit" className="btn btn-primary mb-5">
                        {loading && <Loader/>}
                        Submit
                    </button>
                </form>
                <p>
                    <Link to="/signup/" className="text-decoration-none">Not registered yet, Here is Signup page</Link>
                </p>
            </div>
        </div>
    )
}


export default Home
