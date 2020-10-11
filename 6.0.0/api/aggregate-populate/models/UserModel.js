const { Schema, model } = require('mongoose');

const UserModel = new Schema({
  name: { type: String },
  email: { type: String }
});

module.exports = model('UserModel', UserModel);
