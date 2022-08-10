import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    getUserContactsReducer,
    removeContactReducer,
    selectedUserReducer,
    signupReducer,
    updateUserProfileReducer,
    userLoginReducer,
    userSearchReducer,
} from './redux/reducers/userReducers'
import {getChatListReducer, setCurrentChatIdReducer, startChatReducer} from "./redux/reducers/chatsReducers";


const reducer = combineReducers({
    userLogin: userLoginReducer,
    signup: signupReducer,
    updateProfile: updateUserProfileReducer,
    userContacts: getUserContactsReducer,
    selectedUser: selectedUserReducer,
    removeContact: removeContactReducer,
    searchQuery: userSearchReducer,

    chats: getChatListReducer,
    currentChat: setCurrentChatIdReducer,
    startChat: startChatReducer,
})


const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}


const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
