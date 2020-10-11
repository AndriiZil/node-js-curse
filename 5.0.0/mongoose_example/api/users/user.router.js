const { Router } = require('express');
const UserController = require('./user.controller');

const router = Router();

router.post('/', UserController.createUserValidation, UserController.createUser);

router.get('/', UserController.getUsers);

router.get('/:id', UserController.validateId, UserController.getUserById);

router.delete('/:id', UserController.validateId, UserController.deleteUserById);

router.put('/:id', UserController.updateUserValidation, UserController.validateId, UserController.updateUserById);

router.patch('/:id/films/add', UserController.validateId, UserController.validateAddFilmToUser, UserController.addFilmToUser);

router.patch('/:id/films/remove', UserController.validateId, UserController.validateRemoveFilmForUser, UserController.removeFilmsFromUser);

module.exports = router;
