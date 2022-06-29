import React, {useEffect} from "react";

const Home = () => {
    useEffect(() => {

    })
    return (
        <div className="d-flex align-items-center justify-content-center w-100 vh-100" >
            <div className="w-25 text-start mt-5 h-75">
                <h1 className="mb-5">Login</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">User Name</label>
                    <input type="text" className="form-control" id="username" placeholder="User Name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary mb-5">Submit</button>
            </form>
                </div>
        </div>
    )
}


export default Home