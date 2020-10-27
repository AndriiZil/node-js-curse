'use strict';

const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true, enum: ['Verified', 'Created'], default: 'Created' },
    verificationToken: { type: String, default: '' },
    token: { type: String, required: false },
});

module.exports = model('User', UserSchema);