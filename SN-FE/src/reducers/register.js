import { REGISTER_USER } from '../actions/actionTypes'

export default function registerUser(state = null, action) {
    switch (action.type) {
        case REGISTER_USER:
            return action.obj

        default:
            return state
    }
}