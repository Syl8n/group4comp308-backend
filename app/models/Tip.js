const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  tip: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Tip', schema);