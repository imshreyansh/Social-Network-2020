import { UPDATE_USER_DETAILS, UPDATE_USER_STATUS } from './actionTypes'
import { updateUser, updateStatus } from '../utils/api'


export const updateUserDetails = (obj) => {
    return {
        type: UPDATE_USER_DETAILS,
        obj
    }
}

export const updateUserStatus = (obj) => {
    return {
        type: UPDATE_USER_STATUS,
        obj
    }
}

export const handleUpdateUserDetails = (id, obj) => {
    return (dispatch) => {
        return updateUser(id, obj).then(res => {
            if (res) {
                dispatch(updateUserDetails(res.data))
            }
        })
    }
}

export const handleUpdateStatus = (id, obj) => {
    return (dispatch) => {
        return updateStatus(id, obj).then(res => {
            if (res) {
                dispatch(updateUserStatus(res.data))
            }
        })
    }
}