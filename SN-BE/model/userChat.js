const mongoose = require('mongoose')
const schema = mongoose.Schema

const userChat = new schema({
    sender: {
        type: schema.Types.ObjectId,
        ref: "RegisterSchema"
    },

    chat: [{
        user: {
            type: schema.Types.ObjectId,
            ref: "RegisterSchema"
        },
        message: {
            type: String,
        },
        date: { type: Date, default: Date.now }
    }],
    receiver: {
        type: schema.Types.ObjectId,
        ref: "RegisterSchema"
    }
})

const UserChat = mongoose.model('UserChat', userChat)

exports.UserChat = UserChat
