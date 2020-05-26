const mongoose = require('mongoose')
const schema = mongoose.Schema

const userPost = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: "RegisterSchema"
    },
    status: {
        type: String
    },
    image: Object,

    date: { type: Date, default: Date.now },
    comment: [{
        user: {
            type: schema.Types.ObjectId,
            ref: "RegisterSchema"
        },
        comment: {
            type: String
        },
        date: { type: Date, default: Date.now }
    }],
    like: [{
        user: {
            type: schema.Types.ObjectId,
            ref: "RegisterSchema"
        }
    }]
})

const UserPost = mongoose.model('UserPost', userPost)

exports.UserPost = UserPost