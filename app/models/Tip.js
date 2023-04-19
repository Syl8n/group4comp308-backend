const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  tip: {
    type: String,
    required: true
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

module.exports = mongoose.model('Tip', schema);