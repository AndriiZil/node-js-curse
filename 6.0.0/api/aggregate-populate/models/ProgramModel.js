const { Schema, model, Types: { ObjectId }} = require('mongoose');

const ProgramSchema = new Schema({
  title: { type: String },
  filmId: { type: ObjectId, ref: 'FilmModel', required: true }
}, {
  timestamp: true
});

module.exports = model('Program', ProgramSchema);
