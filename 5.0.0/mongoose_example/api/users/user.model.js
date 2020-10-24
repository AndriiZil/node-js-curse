const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  films: [{
    name: {
      type: String,
      required: false
    }
  }]
});

UserSchema.statics.findUserByIdAndUpdate = findUserByIdAndUpdate;

async function findUserByIdAndUpdate(userId, updateParams) {
  return this.findByIdAndUpdate(userId, {
    $set: updateParams
  }, { new: true });
}

// auth
module.exports = model('User', UserSchema);
