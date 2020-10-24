const { Router } = require('express');

const UserController = require('./users.controller');

const router = Router();

router.post('/', UserController.createUser);

router.get('/', UserController.getUsers);

router.get('/verify/:token', UserController.verifyEmail);

router.post('/sign-in', UserController.signInUser);

module.exports = router;