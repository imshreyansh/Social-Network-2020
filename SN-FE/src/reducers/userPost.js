import { GET_ALL_POST } from '../actions/actionTypes'

export default function getPost(state = null, action) {
    switch (action.type) {
        case GET_ALL_POST:

            return action.obj


        default:
            return state
    }
}