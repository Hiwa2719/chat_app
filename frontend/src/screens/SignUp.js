import React, {useState} from "react";
import axios from "axios";

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const usernameHandler = (e) => {
        setUsername(e.target.value)
        // todo adding check username exists action
    }

    const submitHandler = (e) => {
        e.preventDefault()
        // todo adding two passwords match checking
    }

    return (
        <div className="d-flex align-items-center justify-content-center w-100 vh-100">
            <div className="w-25 text-start mt-5 h-75">
                <h1 className="mb-5">Signup Here</h1>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="username" placeholder="User Name"
                               onChange={usernameHandler}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password1"
                               placeholder="Password" onChange={(e) => setPassword1(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password2" className="form-label">Enter Password again</label>
                        <input type="password" className="form-control" id="password2"
                               placeholder="password again" onChange={(e) => setPassword2(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary mb-5">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp
