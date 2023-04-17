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
  }
});

schema.pre('save', async function(next) {
  this.createdAt = new Date();
  next();
})

module.exports = mongoose.model('EmergencyAlert', schema);