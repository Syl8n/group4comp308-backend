const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('EmergencyAlert', schema);