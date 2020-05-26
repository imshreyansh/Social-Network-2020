import { GET_ALL_POST } from './actionTypes'
import { addPost, getAllPost, addComment, addLike, removeLike } from '../utils/api'
import { error, clearError } from './error'

export const getPost = (obj) => {
    return {
        type: GET_ALL_POST,
        obj
    }
}


export const handlePost = (obj) => {
    return (dispatch) => {
        return addPost(obj).then(res => {
            if (res) {
                dispatch(handleGetPost())
            } else {
                dispatch(error('Error while fetching details'))
                setTimeout(() => {
                    dispatch(clearError())
                }, 5000)
            }
        })
    }
}


export const handleGetPost = () => {
    return (dispatch) => {
        return getAllPost().then(res => {
            if (res) {
                dispatch(getPost(res.data))
            } else {
                dispatch(error('Error while fetching details'))
                setTimeout(() => {
                    dispatch(clearError())
                }, 5000)
            }
        })
    }
}

export const handleAddComment = (obj) => {
    return (dispatch) => {
        return addComment(obj).then(res => {
            if (res) {
                dispatch(handleGetPost())
            } else {
                dispatch(error('Error while fetching details'))
                setTimeout(() => {
                    dispatch(clearError())
                }, 5000)
            }
        })
    }
}

export const handleAddLike = (obj) => {
    return (dispatch) => {
        return addLike(obj).then(res => {
            if (res) {
                dispatch(handleGetPost())
            } else {
                dispatch(error('Error while fetching details'))
                setTimeout(() => {
                    dispatch(clearError())
                }, 5000)
            }
        })
    }
}

export const handleRemoveLike = (obj) => {
    return (dispatch) => {
        return removeLike(obj).then(res => {
            if (res) {
                dispatch(handleGetPost())
            } else {
                dispatch(error('Error while fetching details'))
                setTimeout(() => {
                    dispatch(clearError())
                }, 5000)
            }
        })
    }
}