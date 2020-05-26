const { getUserById } = require('../controller/user')

exports.routes = (express, app) => {

    const router = express.Router();

    router.get('/getUserById/:id', getUserById);



    app.use('/api/member/', router);

}