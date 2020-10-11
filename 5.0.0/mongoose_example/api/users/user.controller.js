const Joi = require('joi');
const User = require('./user.model');
const { Types } = require('mongoose');
const ObjectId = Types.ObjectId;

class UserController {

  async createUser(req, res, next) {
    try {
      const user = await User.create(req.body);

      return res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await User.find();

      return res.send(users);
    } catch (err) {
      next(err);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await User.findById(req.params.id);

      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async deleteUserById(req, res, next) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        return res.status(404).send({ message: 'User was not found' });
      }

      return res.status(200).end();
    } catch (err) {
      next(err);
    }
  }

  async updateUserById(req, res, next) {
    try {
      const user = await User.findUserByIdAndUpdate(req.params.id, req.body);

      if (!user) {
        return res.status(400).send({ message: 'User was not found.' });
      }

      return res.status(200).end();
    } catch (err) {
      next(err);
    }
  }

  async addFilmToUser(req, res, next) {
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(id, {
        $push: { films: req.body }
      }, { new: true });

      return res.status(200).send(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  async removeFilmsFromUser(req, res, next) {
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(id, {
        $pull: { films: { _id: req.body.id } }
      }, { new: true });

      return res.status(200).send(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  validateAddFilmToUser(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string().required()
    });

    UserController.checkErrorValidation(validationRules, req, res, next);
  }

  validateRemoveFilmForUser(req, res, next) {
    const validationRules = Joi.object({
      id: Joi.string().required()
    });

    UserController.checkErrorValidation(validationRules, req, res, next);
  }

  validateId(req, res, next) {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: 'Not valid id' });
    }
    next();
  }

  createUserValidation(req, res, next) {
    const validationRules = Joi.object({
      userName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    });

    UserController.checkErrorValidation(validationRules, req, res, next);
  }

  updateUserValidation(req, res, next) {
    const validationRules = Joi.object({
      userName: Joi.string(),
      email: Joi.string(),
      password: Joi.string()
    });

    UserController.checkErrorValidation(validationRules, req, res, next);
  }

  static checkErrorValidation(schema, req, res, next) {
    const { error } = schema.validate(req.body);

    if (error) {
      const { message } = error.details[0];
      return res.status(422).send({ error: message });
    }
    next();
  }

}

module.exports = new UserController();
