import React, {useState} from "react";
import {useSelector} from "react-redux";


const SearchInput = () => {
    const [query, setQuery] = useState('')
    const {users, loading} = useSelector(state => state.searchQuery)

    return (
        <div>
            <input type="text" className="form-control bg-secondary border-0" value={query}
                   onChange={(e) => setQuery(e.target.value)}/>
            <div className="border-1">
                {
                    users.map((item, index) => (
                        <div key={index}>
                            {item.username}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchInput