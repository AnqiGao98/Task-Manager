var express = require('express');
var router = express.Router();

//const { verifySignUp, verifyToken } = require('../app/middleware');
const authController = require('../app/controllers/auth.controller.js');
const auth = require('../app/middleware/authjwt');
/* GET users listing. */
router.get('/', auth, authController.loadUser);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

//router.get('/account', [verifyToken], userController.userBoard);
module.exports = router;
