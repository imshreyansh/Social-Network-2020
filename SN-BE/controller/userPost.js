const { UserPost } = require('../model/userPost')
const { upload: { uploadAvatar }, } = require('../config')

exports.addPost = async (req, res) => {

    uploadAvatar(req, res, async (error, result) => {
        if (error)
            return res.status(400).send("Error while uploading image")
        if (req.files && req.files.length > 0) {
            const newData = new UserPost({ image: req.files[0], user: JSON.parse(req.body.data).user, status: JSON.parse(req.body.data).status })
            await newData.save()
            res.status(200).send(newData, '', 'Successfully Added Post')
        } else {
            const newData = new UserPost(JSON.parse(req.body.data))
            await newData.save()
            res.status(200).send(newData, '', 'Successfully Added Post Without Image')
        }
    })

}

exports.comment = async (req, res) => {
    const post = await UserPost.findById(req.body.id)
    if (post) {
        await UserPost.findOneAndUpdate({ _id: req.body.id }, { $push: { comment: req.body.comment } })
        res.status(200).send(post, '', 'Successfully Added Comment')
    } else {
        res.status(400)
    }

}

exports.like = async (req, res) => {
    const post = await UserPost.findById(req.body.id)
    if (post) {
        await UserPost.findOneAndUpdate({ _id: req.body.id }, { $push: { like: req.body.like } })
        res.status(200).send(post, '', 'Successfully Added Comment')
    } else {
        res.status(400)
    }

}

exports.UnLike = async (req, res) => {
    const post = await UserPost.findById(req.body.id)
    if (post) {
        await UserPost.findByIdAndUpdate({ _id: req.body.id }, { $pull: { like: req.body.like } })
        res.status(200).send(post, '', 'Successfully Added Comment')
    } else {
        res.status(400)
    }

}

exports.getPost = async (req, res) => {
    const post = await UserPost.find({}).populate('user').populate('comment.user').populate('like.user')
    res.status(200).send(post)
}

exports.getPostById = async (req, res) => {
    const post = await UserPost.findById(req.params.id).populate('user')
    res.status(200).send(post)
}

exports.getUserPost = async (req, res) => {
    const post = await UserPost.find({ user: req.params.id }).populate('user')
    res.status(200).send(post)
}