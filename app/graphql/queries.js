const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Query {
      getMembers(
          firstname: String, 
          lastname: String,
          role: Role
          ): [Member]
      getMember(_id: ID!): Member
      getVitalSigns(_id: ID!, number: Int): [VitalSign]
      getTip: Tip
      getTipsByMemberId(memberId: ID!): [Tip!]!
      getEmergencyAlertById(id: ID!): EmergencyAlert
      getEmergencyAlerts(number: Int): [EmergencyAlert]
      getActiveEmergencyAlerts: [EmergencyAlert]
      getChecklists(_id: ID!): [Checklist]
      getLastChecklist(_id: ID!): Checklist
   
    }
`

module.exports = typeDefs