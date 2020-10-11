const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const Joi = require('joi');
const PORT = 3000;

const DB_NAME = 'example_db';
const URL = `mongodb+srv://admin:qwerty12345@cluster0.o6ql3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

let db;
let usersCollection;

async function main() {
  const app = express();

  const client = await MongoClient.connect(URL, { useUnifiedTopology: true });

  db = client.db(DB_NAME);

  usersCollection = db.collection('users');

  app.use(express.json());

  app.post('/users', validateCreateUser, createUser);
  app.get('/users', getUsers);
  app.get('/users/:id', getUserById);
  app.delete('/users/:id', deleteUserById);
  app.put('/users/:id', validateUpdateUser, updateUserById);

  app.listen(
    PORT,
    () => console.log(`Server was started on port: ${PORT}.`)
  );
}

function validateCreateUser(req, res, next) {
  const validationRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  });

  const { error } = validationRules.validate(req.body);

  if (error) {
    const { message } = error.details[0];
    return res.status(422).send({ error: message });
  }
  next();
}

function validateUpdateUser(req, res, next) {
  const validationRules = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string()
  });

  const { error } = validationRules.validate(req.body);

  if (error) {
    const { message } = error.details[0];
    return res.status(422).send({ error: message });
  }
  next();
}

async function createUser(req, res, next) {
  try {
    const newUser = await usersCollection.insertOne(req.body);

    return res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await usersCollection.find({}).toArray(); // await usersCollection.find({}); {}

    return res.json(users);
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const userId =  req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.json({ message: 'Not valid id' });
    }

    const user = await usersCollection.findOne({ _id: ObjectId(userId) });

    if (!user) {
      return res.json({ message: 'User was not found' });
    }

    console.log(userId);

    return res.status(user);
  } catch (err) {
    next(err);
  }
}

async function deleteUserById(req, res, next) {
  try {
    const userId =  req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.json({ message: 'Not valid id' });
    }

    const { deletedCount } = await usersCollection.deleteOne({ _id: ObjectId(userId) });

    if (!deletedCount) {
      return res.status(404).send({ message: 'User was not found' });
    }

    return res.status(204).end();
  } catch (err) {
    next()
  }
}

async function updateUserById(req, res, next) {
  try {
    const userId = req.params.id;
    const user = req.body;

    const { modifiedCount } = await usersCollection.updateOne(
      { _id: ObjectId(userId) },
      { $set: user }
    );

    if (modifiedCount) {
      return res.send({ message: 'User was updated' });
    }

    return res.send({ message: 'User was not updated' });
  } catch (err) {
    next();
  }
}

main();
