const { addPost, comment, like, getPost, getPostById, getUserPost, UnLike } = require('../controller/userPost')

exports.routes = (express, app) => {

    const router = express.Router();

    router.post('/addPost', addPost);

    router.post('/commentUser', comment);

    router.post('/likeUser', like);

    router.post('/UnLike', UnLike);

    router.get('/getAllPost', getPost);

    router.get('/getPostById/:id', getPostById);

    router.get('/getUserPost/:id', getUserPost);

    app.use('/api/userPost/', router);

}