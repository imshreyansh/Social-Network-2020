const mongoose = require('mongoose')
const schema = mongoose.Schema
const { SECRET } = require('../config/index');
const jwt = require('jsonwebtoken')


const registerSchema = new schema({
    name: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE']
    },

    email: {
        type: String,
    },
    password: {
        type: String,
    },
    avatar: Object,
    userStatus: {
        type: String,
        enum: ['Available', 'Unavailable'],
        default: 'Unavailable'
    },
})


registerSchema.methods.generateToken = function () {
    let token = jwt.sign({
        name: this.name,
        email: this.email,
        gender: this.gender,
        id: this._id.toString(),
    },

        SECRET,
        { expiresIn: 60 * 60 * 24 });
    return token

}

const RegisterSchema = mongoose.model('RegisterSchema', registerSchema)

exports.RegisterSchema = RegisterSchema