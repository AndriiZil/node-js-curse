const { Schema, model, Types: { ObjectId } } = require('mongoose');

const FilmSchema = new Schema({
  title: { type: String },
  genre: { type: String },
  userId: { type: ObjectId, ref: 'UserModel', required: true }
}, {
  timestamp: true
})

module.exports = model('FilmModel', FilmSchema);
