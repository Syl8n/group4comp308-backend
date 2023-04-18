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
  },
  createdAt: {
    type: Date
  },
});

schema.pre('save', async function(next) {
  this.createdAt = new Date();
  next();
})

module.exports = mongoose.model('VitalSign', schema);