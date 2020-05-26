import axios from 'axios'

export const registerNewUser = (obj) => {
    return axios
        .post(`api/user/register`, obj)
        .then(res => {
            return res
        })
        .catch(err => console.log(err))
}

export const loginNewUser = (obj) => {
    return axios
        .post(`api/user/login`, obj)
        .then(res => {
            return res
        })
        .catch(err => console.log(err))
}

export const updateUser = (id, obj) => {
    return axios
        .put(`api/user/updateUser/${id}`, obj)
        .then(res => {
            return res
        })
        .catch(err => console.log(err))
}

export const updateStatus = (id, obj) => {
    return axios
        .put(`api/user/updateStatus/${id}`, obj)
        .then(res => {
            return res
        })
        .catch(err => console.log(err))
}

export const getUserById = (id) => {
    return axios
        .get(`api/member/getUserById/${id}`)
        .then(res => {
            return res
        })
        .catch(err => console.log(err))
}

export const addPost = (obj) => {
    console.log('obj', obj)
    return axios
        .post(`api/userPost/addPost`, obj)
        .then(res => {
            return res
        })
        .catch(err => console.log(err))
}

export const getAllPost = () => {
    return axios
        .get(`api/userPost/getAllPost`)
        .then(res => {
            return res
        })
        .catch(err => console.log(err))
}

export const addComment = (obj) => {
    return axios
        .post(`api/userPost/commentUser`, obj)
        .then(res => {
            return res
        })
        .catch(err => console.log(err))
}

export const addLike = (obj) => {

    return axios
        .post(`api/userPost/likeUser`, obj)
        .then(res => {
            return res
        })
        .catch(err => console.log(err))
}

export const removeLike = (obj) => {

    return axios
        .post(`api/userPost/UnLike`, obj)
        .then(res => {
            return res
        })
        .catch(err => console.log(err))
}

export const getAllUser = () => {
    return axios
        .get(`api/chat/getAllUser`)
        .then(res => {
            return res
        })
        .catch(err => console.log(err))
}

export const getUserChats = (obj) => {
    return axios
        .post(`api/chat/getUsersChat`, obj)
        .then(res => {
            return res
        })
        .catch(err => console.log(err))
}

export const sendChatMessageByUser = (obj) => {
    return axios
        .post(`api/chat/sendChatMessageByUser`, obj)
        .then(res => {
            return res
        })
        .catch(err => console.log(err))
}