const { gql } = require('apollo-server-express')
const Member = require('../models/Member')
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
    }
  }
}

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers
}
