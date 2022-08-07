import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../loader";
import {userSearchAction} from "../../redux/actions/userActions";
import {USER_SEARCH_RESET} from "../../redux/constants/userConstants";
import {startChatAction} from "../../redux/actions/chatsActions";


const SearchInput = () => {
    const dispatch = useDispatch()
    const {users, loading} = useSelector(state => state.searchQuery)

    const queryHandler = (e) => {
        if (e.target.value) {
            dispatch(userSearchAction(e.target.value))
        }
    }

    const closeHandler = () => {
        dispatch({
            type: USER_SEARCH_RESET
        })
    }

    const selectUserHandler = (user) => {
        dispatch(startChatAction(user.id))
        closeHandler()
    }

    return (
        <div className="position-relative">
            <div className="position-relative">
                <input type="text" className="form-control bg-secondary border-0"
                       onChange={queryHandler}/>
                {
                    loading && (
                        <div className="position-absolute text-info" style={{right: '5px', top: '2px'}}>
                            <Loader/>
                        </div>
                    )
                }
            </div>
            {
                users && (
                    <>
                        <div className="search-background" onClick={closeHandler}></div>

                        <div className="search-result bg-secondary">

                            {
                                users.map((user, index) => (
                                    <div key={index} className="search-item p-1" onClick={(e) => selectUserHandler(user)}>
                                        <div className="row text-left">
                                            <div className="col-12">
                                                username: {user.username}
                                            </div>
                                            {
                                                user.first_name && (
                                                    <div className="col-12">
                                                        {user.first_name}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default SearchInput
