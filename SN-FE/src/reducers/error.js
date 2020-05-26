import { ERROR, CLEAR_ERROR } from '../actions/actionTypes'

export default function login(state = null, action) {
    switch (action.type) {
        case ERROR:
            return action.obj
        case CLEAR_ERROR:
            return state = null
        default:
            return state
    }
}