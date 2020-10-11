const { Schema, model } = require('mongoose');

const FilmsSchema = new Schema({
  name: { type: String, required: false },
  genre: { type: String, required: false }
});

module.exports = model('Film', FilmsSchema);

