const route = require('express').Router();
const data_controller = require('../controllers/data.controller')
const auth_middleware = require('../middlewares/auth.middleware')

route.post('/add' ,auth_middleware.verifyToken, auth_middleware.verifySysadmin, data_controller.Add);
route.get('/get', auth_middleware.verifyToken, data_controller.Get);
route.get('/stat',auth_middleware.verifyToken, data_controller.Stat);


module.exports = route;