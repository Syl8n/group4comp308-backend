const { gql } = require('apollo-server-express')
const Tip = require('../models/Tip')

const typeDefs = gql`
    type Tip {
      _id: ID
      title: String
      tip: String
      member: Member
      writer: Writer
      createdAt: Date
    }
    input TipInput{
      title: String
      tip: String
      memberId: ID
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
    addMotivationalTip: async (parent, args, {req}) => {
      const writer = req.user;
      if(!writer || !writer._id){
        throw new Error('Sign In first')
      }

      const tip = new Tip(
        args.form
      );
      tip.member = await Member.findOne({ _id: args.form.memberId }).exec();
      tip.writer = await Member.findOne({ _id: writer._id }).exec();
      try {
        const doc = await tip.save();
        console.log(doc);
      }catch(err){
        console.error(err);
        console.log('here');
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
