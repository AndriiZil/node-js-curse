const { Router } = require('express');

const UserController = require('./auth.controller');

const router = Router();

router.post('/sign-up', UserController.signUpUser);

router.post('/sign-in', UserController.signInUser);

router.get('/', UserController.getUsers);

router.get('/verify/:token', UserController.verifyEmail);

module.exports = router;