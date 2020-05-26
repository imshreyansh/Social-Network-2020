import { ERROR, CLEAR_ERROR } from './actionTypes'

export const error = (obj) => {
    return {
        type: ERROR,
        obj
    }
}

export const clearError = () => {
    return {
        type: CLEAR_ERROR,
    }
}