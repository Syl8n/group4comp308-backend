const { gql } = require('apollo-server-express')
const EmergencyAlert = require('../models/EmergencyAlert')
const Member = require('../models/Member')

const typeDefs = gql`
type EmergencyAlert {
  _id: ID
  patient: Member
  createdAt: Date
  severity: Severity
  status: Status
  resolution: String
}
`
const resolvers = {
  Query: {
    getEmergencyAlertById: async (parent, args, { req }) => {
      if (!req.user) {
        throw new Error('Sign In first')
      }
      if (req.user.role != 'NURSE') {
        throw new Error('You are not a nurse')
      }

      const { id } = args;
      try {
        const emergencyAlert = await EmergencyAlert.findById(id).exec();
        if (!emergencyAlert) {
          throw new Error('Emergency Alert not found');
        }
        return emergencyAlert;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getEmergencyAlerts: async (parent, args, { req }) => {
      if (!req.user) {
        throw new Error('Sign In first')
      }
      if (req.user.role != 'NURSE') {
        throw new Error('You are not a nurse')
      }
      const emergencyAlerts = args.number == 0 ?
        await EmergencyAlert.find({}).populate('patient').sort({ _id: -1 }).exec()
        : await EmergencyAlert.find({}).populate('patient').sort({ _id: -1 }).limit(args.number).exec();
      return emergencyAlerts;
    },
    getActiveEmergencyAlerts: async () => {
      const activeAlerts = await EmergencyAlert.find({ status: 'ACTIVE' }).populate('patient').exec();
      return activeAlerts;
    },
  },
  Mutation: {
    addEmergencyAlert: async (parent, { severity }, { req }) => {
      const patient = req.user;
      if (!patient || !patient._id) {
        throw new Error('Sign In first')
      }
      if (patient.role != 'PATIENT') {
        throw new Error('You are not a patient')
      }

      const emergencyAlert = new EmergencyAlert({
        patient: await Member.findOne({ _id: patient._id }).exec(),
        severity: severity
      });

      try {
        const doc = await emergencyAlert.save();
        console.log(doc);
      } catch (err) {
        console.error(err);
        throw err;
      }

      return emergencyAlert;
    },
    resolveEmergencyAlert: async (parent, args, { req }) => {
      // Ensure user is authenticated and has appropriate role
      const user = req.user;
      if (!user || user.role !== 'NURSE') {
        throw new AuthenticationError('Not authorized');
      }
      const alertId = args.alertId;
      const resolution = args.resolution;

      // Find emergency alert by ID
      const alert = await EmergencyAlert.findById(alertId);
      if (!alert) {
        throw new Error('Emergency alert not found');
      }

      // Set alert status to resolved and add resolution
      alert.status = 'RESOLVED';
      alert.resolution = resolution;

      try {
        const updatedAlert = await alert.save();
        console.log(updatedAlert);
        return updatedAlert;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  }
}

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers
}
