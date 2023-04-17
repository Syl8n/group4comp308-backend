const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  fever: {
    type: Number
  },
  cough: {
    type: Number
  },
  shortnessOfBreath: {
    type: Number
  },
  fatigue: {
    type: Number
  },
  bodyAches: {
    type: Number
  },
  headache: {
    type: Number
  },
  lossOfTasteOrSmell: {
    type: Number
  },
  soreThroat: {
    type: Number
  },
  congestion: {
    type: Number
  },
  nauseaOrVomiting: {
    type: Number
  },
  diarrhea: {
    type: Number
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

module.exports = mongoose.model('Checklist', schema);