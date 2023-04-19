const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  createdAt: {
    type: Date
  },
  severity: {
    type: String,
    enum: ['MILD', 'SEVERE', 'CRITICAL'],
    required: true
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'RESOLVED'],
    default: 'ACTIVE'
  }
});

schema.pre('save', async function(next) {
  this.createdAt = new Date();
  next();
})

module.exports = mongoose.model('EmergencyAlert', schema);
