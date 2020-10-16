const { Schema, model, Types: { ObjectId } } = require('mongoose');

const storySchema = new Schema({
    title: { type: String, required: true },
    author: { type: ObjectId, ref: 'User' }
});

module.exports = model('Story', storySchema);