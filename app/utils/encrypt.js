const bcrypt = require('bcrypt')
const saltRounds = 10

async function hash(plain) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plain, salt);
}

module.exports = hash;