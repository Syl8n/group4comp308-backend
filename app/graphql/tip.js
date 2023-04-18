const { gql } = require('apollo-server-express')
const Tip = require('../models/Tip')

const typeDefs = gql`
    type Tip {
      _id: ID
      tip: String
    }
`
const resolvers = {
  Query: {
    getTip: async (parent, args, { req }) => {
      if(!req.user){
        throw new Error('Sign in first')
      }
      if(req.user.role != 'PATIENT'){
        throw new Error('You are not a patient')
      }
      const tips = await Tip.find({}).exec();
      return tips[Math.floor(Math.random() * tips.length)];
    },
  },
  Mutation: { 
    addTip: async (parent, args) => {
      if(!req.user){
        throw new Error('Sign in first')
      }
      if(req.user.role != 'NURSE'){
        throw new Error('You are not a nurse')
      }
      const tip = new Tip(
        args
      );
      try {
        const doc = await tip.save();
        console.log(doc);
      }catch(err){
        console.error(err);
        throw err;
      }
      return tip;
    },
  }
}

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers
}
