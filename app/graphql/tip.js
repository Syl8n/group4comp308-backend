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
    getTip: async (parent, args) => {
      const tips = await Tip.find({}).exec();
      return tips[Math.floor(Math.random() * tips.length)];
    },
  },
  Mutation: { 
    addTip: async (parent, args) => {
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
