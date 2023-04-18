const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  temperature: {
    type: Number
  },
  heartRate: {
    type: Number
  },
  bloodPressureMax: {
    type: Number
  },
  bloodPressureMin: {
    type: Number
  },
  respiratoryRate: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
  }
});

module.exports = mongoose.model('VitalSign', schema);