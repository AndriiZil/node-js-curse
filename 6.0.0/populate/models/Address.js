const { Schema, model, Types: { ObjectId } } = require('mongoose');

const addressSchema = new Schema({
    street: { type: String, required: true },
    user: { type: ObjectId, ref: 'User' }
});

module.exports = model('Address', addressSchema);