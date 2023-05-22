const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  // tagged: [
  //   {
  //     user: {
  //       type: Schema.Types.ObjectId,
  //       ref: "users"
  //     }
  //   }
  // ]
});

module.exports = User = mongoose.model('users', UserSchema);