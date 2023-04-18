const { gql } = require('apollo-server-express')
const Member = require('../models/Member')
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/config');

const typeDefs = gql`
    type AuthPayload {
      member: Member!
      token: String!
    }
`
const resolvers = {
  Mutation: {
    login: async (parent, { username, password }, {req, res}) => {
      const member = await Member.findOne({ username: username }).exec();
      if (!member) {
        throw new Error("Invalid username or password");
      }
      const validPassword = await member.comparePassword(password);
      if (!validPassword) {
        throw new Error("Invalid username or password");
      }
      const token = jwt.sign({ id: member._id, role: member.role }, jwtSecret, { expiresIn: '1d' });
      res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
      })
      return { member, token };
    },
    logout: async (parent, args, { res }) => {
      res.clearCookie('token');
    }
  }
}

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers
}
