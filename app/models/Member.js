const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 4
  },
  firstname: {
    type: String,
    maxlength: 50
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: String,
    enum: ['nurse', 'patient']
  }
});

module.exports = mongoose.model('Member', schema);