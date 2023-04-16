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
    enum: ['nurse', 'patient'],
    required: true
  }
});

schema.virtual('fullname').get(() => {
  return `${this.firstname} ${this.lastname}`;
});

schema.pre('save', (next) => {
  if (this.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(this.password, salt, function (err, hash) {
        if (err) return next(err)
        this.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

schema.methods.comparePassword = (plain, next) => {
  bcrypt.compare(plain, this.password, function(err, same){
      if(err) return next(err)
      next(null, same)
  })
}

module.exports = mongoose.model('Member', schema);