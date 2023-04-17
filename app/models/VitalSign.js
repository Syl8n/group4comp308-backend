const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  temperature: {
    type: Number
  },
  heartRateMax: {
    type: Number
  },
  heartRateMin: {
    type: Number
  },
  bloodPressureMax: {
    type: Number
  },
  bloodPressureMin: {
    type: Number
  },
  respiratoryRateMax: {
    type: Number
  },
  respiratoryRateMin: {
    type: Number
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