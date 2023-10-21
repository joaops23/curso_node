const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

//controller

router.get('/login', AuthController.login);
router.get('/register', AuthController.register);
router.get('/logout', AuthController.logout);
router.post('/register', AuthController.registerPost);
router.post('/login', AuthController.loginPost);

module.exports = router;