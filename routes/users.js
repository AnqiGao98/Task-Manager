var express = require('express');
var router = express.Router();

//const { verifySignUp, verifyToken } = require('../app/middleware');
const authController = require('../app/controllers/auth.controller.js');
const userController = require('../app/controllers/user.controller.js');

/* GET users listing. */
router.post('/signup', authController.signup);

router.post('/login', authController.login);

//router.get('/account', [verifyToken], userController.userBoard);
module.exports = router;
