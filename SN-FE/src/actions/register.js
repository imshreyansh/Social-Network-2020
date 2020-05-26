import { REGISTER_USER } from './actionTypes'
import { registerNewUser } from '../utils/api'
import { error, clearError } from './error'

export const registerUser = (obj) => {
    return {
        type: REGISTER_USER,
        obj
    }
}

export const handleRegister = (obj) => {
    return (dispatch) => {
        return registerNewUser(obj).then(res => {
            if (res) {
                dispatch(registerUser(res.data))
            } else {
                dispatch(error('User Already Exists'))
                setTimeout(() => {
                    dispatch(clearError())
                }, 5000)
            }
        })
    }
}
