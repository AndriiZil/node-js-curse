const Joi = require('joi');

const users = [
  { id: 1, name: 'Richard', email: 'richard@gmail.com', password: 'qwerty' },
  { id: 2, name: 'Josh', email: 'josh@gmail.com', password: 'asdfg' },
  { id: 3, name: 'Inna', email: 'inna@gmail.com', password: 'zxcvb' },
]

class UsersController {

  static getUsers(req, res, next) {
    try {
      // throw new NotFoundError('User was not found.');
      return res.json(users);
    } catch (err) {
      next(err);
    }
  }

  // Create User
  static createUser(req, res, next) {
    try {
      users.push({
        id: users.length + 1,
        ...req.body
      });
      return res.send(users);
    } catch (err) {
      next(err);
    }
  }

  // Validate User creation
  static validateCreateUser(req, res, next) {
    const createUserSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    });

    UsersController.checkError(createUserSchema, req, res, next);
  }

  // Update User
  static validateUpdateUser(req, res, next) {
    const updateUserValidation = Joi.object({
      name: Joi.string(),
      email: Joi.string()
    });

    UsersController.checkError(updateUserValidation, req, res, next);
  }

  // Check Error
  static checkError(schema, req, res, next) {
    const { error } = schema.validate(req.body);

    if (error) {
      const { message } = error.details[0];
      return res.status(422).send({ error: message });
    }
    next();
  }

  // Update User
  static updateUser(req, res, next) {
    try {
      const targetUserIndex = UsersController.findUserIndexById(req.params.id, res);

      if (targetUserIndex === undefined) {
        throw new NotFoundError('User was not found.');
      }
      users[targetUserIndex] = {
        ...users[targetUserIndex],
        ...req.body
      }

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  }

  // Delete User
  static deleteUser(req, res) {
    const targetUserIndex = UsersController.findUserIndexById(req.params.id, res);

    if (targetUserIndex === undefined) {
      return;
    }

    users.splice(targetUserIndex, 1);

    res.status(204).end();
  }

  // Find User by Index
  static findUserIndexById(userId, res) {
    const id = parseInt(userId);

    const targetUserIndex = users.findIndex(user => user.id === id);

    if (targetUserIndex === -1) {
      // return res.status(404).send('User does not exist.');
      throw new NotFoundError('User was not found.');
    }

    return targetUserIndex;
  }

}

class NotFoundError extends Error {

  constructor(message) {
    super(message);

    this.status = 404;
    delete this.trace;
  }

}

module.exports = UsersController;
