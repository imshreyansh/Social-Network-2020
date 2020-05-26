import { GET_USER_BY_ID } from './actionTypes'
import { getUserById } from '../utils/api'
import { error, clearError } from './error'

export const getUser = (obj) => {
    return {
        type: GET_USER_BY_ID,
        obj
    }
}

export const handleGetUserById = (id) => {
    return (dispatch) => {
        return getUserById(id).then(res => {
            if (res) {
                dispatch(getUser(res.data))
            } else {
                dispatch(error('Error while fetching details'))
                setTimeout(() => {
                    dispatch(clearError())
                }, 5000)
            }
        })
    }
}