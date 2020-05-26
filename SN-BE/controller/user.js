const { RegisterSchema } = require('../model/register')
const bcrypt = require('bcrypt');
const { upload: { uploadAvatar }, } = require('../config')


exports.getUserById = async (req, res) => {
    const getUser = await RegisterSchema.findById(req.params.id)
    if (getUser) {
        res.status(200).send(getUser)
    } else {
        res.status(400)
    }

}


