import { LOGIN_USER, LOGOUT_USER } from '../actions/actionTypes'

export default function login(state = null, action) {
    switch (action.type) {
        case LOGIN_USER:

            return action.obj

        case LOGOUT_USER:
            return state = null

        default:
            return state
    }
}