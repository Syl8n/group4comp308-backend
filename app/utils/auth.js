const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/config')

module.exports = function (req, res, next) {
  if (req.cookies && req.cookies.token) {
    try{
      const decoded = jwt.verify(req.cookies.token, jwtSecret)
      req.user = {
        _id: decoded.id,
        role: decoded.role
      }
    } catch(err) {
      throw err
    }
  }
  next()
}