import { GET_ALL_USERS, GET_USER_CHAT } from '../actions/actionTypes'

export default function getAllUsers(state = null, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            const allUsers = action.obj
            return {
                ...state,
                allUsers
            }

        case GET_USER_CHAT:
            const userChat = action.obj
            return {
                ...state,
                userChat
            }


        default:
            return state
    }
}