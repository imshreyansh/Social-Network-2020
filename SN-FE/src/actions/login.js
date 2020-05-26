import { LOGIN_USER, LOGOUT_USER } from './actionTypes'
import { loginNewUser } from '../utils/api'
import { error, clearError } from './error'
import { storeItem, removeItemFromStorage } from '../utils/localStorage'
export const login = (obj) => {
    return {
        type: LOGIN_USER,
        obj
    }
}

export const logout = () => {
    removeItemFromStorage('jwtToken');
    return {
        type: LOGOUT_USER,
    }
}

export const handleLogin = (obj) => {
    return (dispatch) => {
        return loginNewUser(obj).then(res => {
            if (res) {
                storeItem('jwtToken', res.data);
                dispatch(login(res.data))
            } else {
                dispatch(error('Incorrect Username or Password'))
                setTimeout(() => {
                    dispatch(clearError())
                }, 5000)
            }
        })
    }
}