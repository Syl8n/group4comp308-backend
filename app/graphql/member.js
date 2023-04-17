const { gql } = require('apollo-server-express')
const Member = require('../models/Member')
const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';
const objectFilter = require('../utils/object.filter')
const encrypt = require('../utils/encrypt')

const typeDefs = gql`
    type Member {
      _id: ID
      username: String
      password: String
      firstname: String
      lastname: String
      role: Role
    }
    input MemberInput{
      username: String
      password: String
      firstname: String
      lastname: String
      role: Role
    }
`
const resolvers = {
  Query: {
    getMembers: async (parent, args) => {
      const form = objectFilter(args);
      const members = await Member.find({ ...form }).exec();
      return members;
    },
    getMember: async (parent, args) => {
      const member = await Member.findOne({ _id: args._id }).exec();
      if (!member) {
        throw new Error("Error");
      }
      return member;
    },
  },
  Mutation: { 
    addMember: async (parent, args) => {
      const member = new Member(
        args.form
      );
      try {
        const doc = await member.save();
        console.log(doc);
      }catch(err){
        console.error(err);
        throw err;
      }
      
      return member;
    },
    updateMember: async (parent, args) => {
      const form = objectFilter(args.form);
      if(form.password){
        form.password = await encrypt(form.password)
      }
      const member = await Member.findOneAndUpdate({ _id: args._id },
        form,
        {new: true}
      ).exec();
      if (!member) {
        throw new Error("Error");
      }
      return member;
    },
    login: async (parent, { username, password }) => {
      const member = await Member.findOne({ username: username }).exec();
      if (!member) {
        throw new Error("Invalid username or password");
      }
      const validPassword = await member.comparePassword(password);
      if (!validPassword) {
        throw new Error("Invalid username or password");
      }
      const token = jwt.sign({ id: member._id }, secret, { expiresIn: '1d' });
      return { member, token };
    }
  }
}

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers
}
