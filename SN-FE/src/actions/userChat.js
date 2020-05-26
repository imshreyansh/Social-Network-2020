import { GET_ALL_USERS, GET_USER_CHAT } from './actionTypes'
import { getAllUser, getUserChats, sendChatMessageByUser } from '../utils/api'
import { error, clearError } from './error'

export const getAllUsers = (obj) => {
    return {
        type: GET_ALL_USERS,
        obj
    }
}

export const getUserChat = (obj) => {
    return {
        type: GET_USER_CHAT,
        obj
    }
}

export const handleGetAllUsers = () => {
    return (dispatch) => {
        getAllUser().then(res => {
            if (res) {
                dispatch(getAllUsers(res.data))
            } else {
                dispatch(error('Error while fetching details'))
                setTimeout(() => {
                    dispatch(clearError())
                }, 5000)
            }
        })
    }
}

export const handleGetUserChat = (obj) => {
    return (dispatch) => {
        getUserChats(obj).then(res => {
            if (res) {
                dispatch(getUserChat(res.data))
            } else {
                dispatch(error('Error while fetching details'))
                setTimeout(() => {
                    dispatch(clearError())
                }, 5000)
            }
        })
    }
}

export const handleSendUserChat = (obj, obj2) => {
    return (dispatch) => {
        sendChatMessageByUser(obj).then(res => {
            if (res) {
                dispatch(handleGetUserChat(obj2))
            } else {
                dispatch(error('Error while fetching details'))
                setTimeout(() => {
                    dispatch(clearError())
                }, 5000)
            }
        })
    }
}