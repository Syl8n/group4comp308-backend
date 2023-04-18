const { gql } = require('apollo-server-express')
const VitalSign = require('../models/VitalSign')
const Member = require('../models/Member')

const typeDefs = gql`
    type VitalSign {
      _id: ID
      temperature: Float
      heartRate: Int
      bloodPressureMax: Int
      bloodPressureMin: Int
      respiratoryRate: Int
      member: Member
      writer: Member
      createdAt: Date
    }
    input VitalSignInput{
      temperature: Float
      heartRate: Int
      bloodPressureMax: Int
      bloodPressureMin: Int
      respiratoryRate: Int
      memberId: ID
    }
`
const resolvers = {
  Query: {
    getVitalSigns: async (parent, args) => {
      const vitalSigns = args.number == 0 ? 
        await VitalSign.find({ member: args._id }).populate('member').sort({ _id: -1 }).exec()
        : await VitalSign.find({ member: args._id }).populate('member').sort({ _id: -1 }).limit(args.number).exec();
      return vitalSigns;
    },
  },
  Mutation: { 
    addVitalSign: async (parent, args, { req }) => {
      const writer = req.user;
      if(!writer || !writer._id){
        throw new Error('Sign In first')
      }

      const vitalSign = new VitalSign(
        args.form
      );
      vitalSign.member = await Member.findOne({ _id: args.form.memberId }).exec();
      vitalSign.writer = await Member.findOne({ _id: writer._id }).exec();

      try {
        const doc = await vitalSign.save();
        console.log(doc);
      }catch(err){
        console.error(err);
        throw err;
      }
      
      return vitalSign;
    },
    updateVitalSign: async (parent, args, { req }) => {
      const writer = req.user;
      console.log(writer)
      if(!writer || !writer._id){
        throw new Error('Sign In first')
      }
      const vitalSign = await VitalSign.findOneAndUpdate({ _id: args._id },
        args.form,
        {new: true}
      ).exec();
      if (!vitalSign) {
        throw new Error("Error");
      }
      return vitalSign;
    }
  }
}

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers
}
