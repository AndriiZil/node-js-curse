const { Schema, model, Types: { ObjectId } } = require('mongoose');

const UserSchema = new Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    stories: [{ type: ObjectId, ref: 'Story' }],
    address: [{ type: ObjectId, ref: 'Address' }]
});

module.exports = model('User', UserSchema);