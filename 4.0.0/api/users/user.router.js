const { Router } = require('express');
const UsersController = require('./user.controller');
const userRouter = Router();

userRouter.get('/', UsersController.getUsers);

userRouter.post('/', UsersController.validateCreateUser, UsersController.createUser);

userRouter.put('/:id', UsersController.validateUpdateUser, UsersController.updateUser);

userRouter.delete('/:id', UsersController.deleteUser);

module.exports = userRouter;
