const { sendChatMessageByUser, getUsersChat, getAllUser } = require('../controller/userChat')

exports.routes = (express, app) => {

    const router = express.Router();

    router.post('/sendChatMessageByUser', sendChatMessageByUser);

    router.post('/getUsersChat', getUsersChat);

    router.get('/getAllUser', getAllUser);

    app.use('/api/chat/', router);

}