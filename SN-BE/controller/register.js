const { RegisterSchema } = require('../model/register')
const bcrypt = require('bcrypt');
const { upload: { uploadAvatar }, } = require('../config')


exports.register = async (req, res) => {
    if (req.body !== undefined) {
        const checkMail = await RegisterSchema.findOne({ email: req.body.email })
        if (checkMail) return res.status(400).send('User already exist')
        const allData = new RegisterSchema({ name: req.body.name, password: req.body.password, email: req.body.email, gender: req.body.gender })
        const salt = await bcrypt.genSalt(12)
        allData.password = await bcrypt.hash(allData.password, salt)
        await allData.save()
        res.status(200).send(allData)
    } else {
        res.status(400).send('Bad Request')
    }
}


exports.login = async (req, res) => {
    if (req.body) {
        const checkUser = await RegisterSchema.findOne({ email: req.body.email })
        if (!checkUser) return res.status(400).send('User not found')
        const checkPass = await bcrypt.compare(req.body.password, checkUser.password)
        if (checkPass) {
            res.status(200).send(checkUser.generateToken(), '', 'Login successful')
        } else {
            res.status(400).send("Incorrect Password")
        }
    }
}

exports.updateUser = async (req, res) => {

    uploadAvatar(req, res, async (error, result) => {
        if (error)
            return res.status(400).send("Error while uploading image")
        if (req.files.length > 0) {
            await RegisterSchema.findByIdAndUpdate(req.params.id, { avatar: req.files[0] })
            res.status(200).send('Successfully Updated Details')
        }
        if (req.body.data) {
            RegisterSchema.findOneAndUpdate({ _id: req.params.id }, JSON.parse(req.body.data))
                .then(response => {
                    response.status(200).send(res, response, 'Successfully Updated Details')
                }).catch(error => {
                    console.log(res, error, 'Error')
                });
        }



    })

}

exports.updateStatus = async (req, res) => {

    const getUser = await RegisterSchema.findByIdAndUpdate(req.params.id, { userStatus: req.body.userStatus })
    if (getUser) {
        res.status(200).send('Status updated successfully')
    } else {
        res.status(400)
    }


}