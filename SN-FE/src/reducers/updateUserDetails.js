import { UPDATE_USER_DETAILS, UPDATE_USER_STATUS } from '../actions/actionTypes'

export default function updateUserDetails(state = null, action) {
    switch (action.type) {
        case UPDATE_USER_DETAILS:
            const updatedAvatar = action.obj
            return {
                ...state,
                updatedAvatar
            }

        case UPDATE_USER_STATUS:
            const updatedStatus = action.obj
            return {
                ...state,
                updatedStatus
            }

        default:
            return state
    }
}