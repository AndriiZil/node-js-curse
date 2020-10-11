const { Router } = require('express');
const UsersController = require('./users.controller');

const router = Router();

router.post('/', UsersController.createUser);

router.get('/current', UsersController.authorize, UsersController.getCurrentUser);

router.get('/', UsersController.getUsers);

router.patch('/films/favourites/:id', UsersController.authorize, UsersController.validateId, UsersController.addFilmForUser);

router.delete('/films/favourites/:id', UsersController.authorize, UsersController.validateId, UsersController.removeFilmFromUser);

router.put('/sign-in', UsersController.validateSignIn, UsersController.signIn);

router.patch('/logout', UsersController.authorize, UsersController.logout)

module.exports = router;
