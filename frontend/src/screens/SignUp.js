import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signupAction} from "../redux/actions/userActions";
import Alert from "../components/alert";
import {SIGNUP_RESET} from "../redux/constants/userConstants";
import {useNavigate} from "react-router-dom";
import Loader from "../components/loader";

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true)

    const dispatch = useDispatch()
    const {loading, error: signupErrors} = useSelector(state => state.signup)
    const {userInfo} = useSelector(state => state.userLogin)

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (password1 === password2) {
            dispatch(signupAction({username: username, password: password1}))
        } else {
            setPasswordMatch(false)
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate('/account/')
        }
    }, [userInfo])

    const usernameHandler = (e) => {
        setUsername(e.target.value)
        dispatch({type: SIGNUP_RESET})
    }

    const password1Handler = (e) => {
        setPassword1(e.target.value)
        setPasswordMatch(true)
        dispatch({type: SIGNUP_RESET})
    }
    const password2Handler = (e) => {
        setPasswordMatch(true)
        setPassword2(e.target.value)
    }

    return <>
        {
            !userInfo && (
                <div className="d-flex align-items-center justify-content-center w-100 vh-100">
                    <div className="w-25 text-start mt-5 h-75">
                        <h1 className="mb-5">Signup Here</h1>
                        <form onSubmit={submitHandler}>
                            {
                                signupErrors && (
                                    <div>
                                        <Alert alertType="danger">
                                            <ul className="py-1 m-0">
                                                {
                                                    signupErrors.map((error, index) => (
                                                        <li key={index}>{error}</li>
                                                    ))
                                                }
                                            </ul>
                                        </Alert>
                                    </div>
                                )
                            }

                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">User Name</label>
                                <input type="text" className="form-control" id="username" placeholder="User Name"
                                       onChange={usernameHandler}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password1"
                                       placeholder="Password" onChange={password1Handler}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password2" className="form-label">Enter Password again</label>
                                <input type="password" className="form-control" id="password2"
                                       placeholder="password again" onChange={password2Handler}/>
                                {
                                    !passwordMatch && (
                                        <div className="mt-1">
                                            <Alert alertType="danger">
                                                Your password don't match, please check them again!
                                            </Alert>
                                        </div>
                                    )
                                }
                            </div>
                            <button type="submit" className="btn btn-primary mb-5">
                                {loading && <Loader/>}
                                Submit
                            </button>
                        </form>
                    </div>
                </div>

            )
        }

    </>

}

export default SignUp
