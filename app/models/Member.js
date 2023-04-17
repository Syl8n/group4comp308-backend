const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const saltRounds = 10

const schema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: 1,
    required: true
  },
  password: {
    type: String,
    minlength: 4,
    required: true
  },
  firstname: {
    type: String,
    maxlength: 50,
    required: true
  },
  lastname: {
    type: String,
    maxlength: 50,
    required: true
  },
  role: {
    type: String,
    enum: ['NURSE', 'PATIENT'],
    required: true
  }
});

schema.virtual('fullname').get(function() {
  return `${this.firstname} ${this.lastname}`;
});

schema.pre('save', function(next) {
  var member = this
  if (member.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(member.password, salt, function (err, hash) {
        if (err) return next(err)
        member.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

schema.methods.comparePassword = async function (plain) {
  return await bcrypt.compare(plain, this.password)
};

module.exports = mongoose.model('Member', schema);