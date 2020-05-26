const { RegisterSchema } = require('../model/register')
const { UserChat } = require('../model/userChat')

exports.getAllUser = async (req, res) => {
    const allUsers = await RegisterSchema.find({})
    if (allUsers) {
        res.status(200).send(allUsers)
    } else {
        res.status(400)
    }
}

exports.sendChatMessageByUser = async (req, res) => {
    if (req.body) {
        const check = await UserChat.find({ sender: req.body.sender, receiver: req.body.receiver })
        const checkTwo = await UserChat.find({ receiver: req.body.sender, sender: req.body.receiver }).populate('chat.user')

        if (check.length >= 1) {
            const data = check[0]
            const updateChat = await UserChat.findByIdAndUpdate({ _id: data._id }, { $push: { chat: req.body.chat } })
            res.status(200).send('Successfully Sent')
        } else if (checkTwo.length >= 1) {
            const data = checkTwo[0]
            const updateChat = await UserChat.findByIdAndUpdate({ _id: data._id }, { $push: { chat: req.body.chat } })
            res.status(200).send('Successfully Sent')
        }
        else {
            const chats = new UserChat({ sender: req.body.sender, receiver: req.body.receiver, chat: req.body.chat })
            await chats.save()
            res.status(200).send('Successfully Sent')
        }
    }
}

exports.getUsersChat = async (req, res) => {

    const check = await UserChat.find({ sender: req.body.sender, receiver: req.body.receiver }).populate('chat.user')
    const checkTwo = await UserChat.find({ receiver: req.body.sender, sender: req.body.receiver }).populate('chat.user')

    if (check.length >= 1) {
        res.status(200).send(check)
    } else if (checkTwo) {
        res.status(200).send(checkTwo)
    } else {
        res.status(200).send(check)
    }


}

