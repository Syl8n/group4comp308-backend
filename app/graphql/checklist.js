const { gql } = require('apollo-server-express')
const Checklist = require('../models/Checklist')
const Member = require('../models/Member')

const typeDefs = gql`
    type Checklist {
      _id: ID
      fever: Int
      cough: Int
      shortnessOfBreath: Int
      fatigue: Int
      bodyAches: Int
      headache: Int
      lossOfTasteOrSmell: Int
      soreThroat: Int
      congestion: Int
      nauseaOrVomiting: Int
      diarrhea: Int
      writer: Member
      createdAt: Date
    }
    input ChecklistInput{
      fever: Int
      cough: Int
      shortnessOfBreath: Int
      fatigue: Int
      bodyAches: Int
      headache: Int
      lossOfTasteOrSmell: Int
      soreThroat: Int
      congestion: Int
      nauseaOrVomiting: Int
      diarrhea: Int
    }
`
const resolvers = {
  Query: {
    getChecklists: async (parent, args) => {
      const checklist = await Checklist.find({ writer: args._id }).populate('writer').sort({ _id: -1 }).exec();
      return checklist;
    },
    getLastChecklist: async (parent, args) => {
      const checklist = await Checklist.find({ writer: args._id }).populate('writer').sort({ _id: -1 }).limit(1).exec();
      return checklist[0];
    },
  },
  Mutation: { 
    addChecklist: async (parent, args, { req }) => {
      const writer = req.user;
      if(!writer || !writer._id){
        throw new Error('Sign In first')
      }

      const checklist = new Checklist(
        args.form
      );
      checklist.writer = await Member.findOne({ _id: writer._id }).exec();

      try {
        const doc = await checklist.save();
        console.log(doc);
      }catch(err){
        console.error(err);
        throw err;
      }
      
      return checklist;
    }
  }
}

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers
}
