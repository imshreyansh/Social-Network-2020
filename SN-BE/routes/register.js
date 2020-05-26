const { register, login, updateUser, updateStatus } = require('../controller/register')

exports.routes = (express, app) => {

    const router = express.Router();

    router.post('/register', register);

    router.post('/login', login);

    router.put('/updateUser/:id', updateUser)

    router.put('/updateStatus/:id', updateStatus)


    app.use('/api/user/', router);

}