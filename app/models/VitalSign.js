const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  temperature: {
    type: Number
  },
  heartRate: {
    type: Number
  },
  bloodPressure: {
    type: Number
  },
  respiratoryRate: {
    type: Number
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  }
});

module.exports = mongoose.model('VitalSign', schema);