const { gql } = require('apollo-server-express')
const EmergencyAlert = require('../models/EmergencyAlert')
const Member = require('../models/Member')

const typeDefs = gql`
    type EmergencyAlert {
      _id: ID
      patient: Member
      createdAt: Date
    }
`
const resolvers = {
  Query: {
    getEmergencyAlerts: async (parent, args) => {
      const emergencyAlerts = args.number == 0 ? 
      await EmergencyAlert.find({}).populate('patient').sort({ _id: -1 }).exec()
      : await EmergencyAlert.find({}).populate('patient').sort({ _id: -1 }).limit(args.number).exec();
      return emergencyAlerts;
    },
  },
  Mutation: { 
    addEmergencyAlert: async (parent, args, context) => {
      let patient = context.user;
      console.log(patient)
      if(!patient || !patient._id){
        throw new Error('Sign In first')
      }

      // test
      // patient = { _id : "643d2a34e1dfdaf39b3d6d53"};

      const emergencyAlert = new EmergencyAlert({
        patient: await Member.findOne({ _id: patient._id }).exec()
      });

      try {
        const doc = await emergencyAlert.save();
        console.log(doc);
      }catch(err){
        console.error(err);
        throw err;
      }
      
      return emergencyAlert;
    },
  }
}

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers
}
