import { GET_USER_BY_ID } from '../actions/actionTypes'

export default function getUserById(state = null, action) {
    switch (action.type) {
        case GET_USER_BY_ID:

            return action.obj


        default:
            return state
    }
}