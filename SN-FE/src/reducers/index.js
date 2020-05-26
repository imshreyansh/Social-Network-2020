import { combineReducers } from 'redux'
import registerUser from './register'
import login from './login'
import error from './error'
import updateUserDetails from './updateUserDetails'
import user from './user'
import userPost from './userPost'
import userChat from './userChat'

export default combineReducers({
    registerUser,
    login,
    updateUserDetails,
    error,
    user,
    userPost,
    userChat
})