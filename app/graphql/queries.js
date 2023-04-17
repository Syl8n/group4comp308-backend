const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Query {
      getMembers(
          firstname: String, 
          lastname: String,
          role: Role
          ): [Member]
      getMember(_id: ID!): Member
      getVitalSigns(_id: ID!): [VitalSign]
      getTip: Tip
      getEmergencyAlerts: [EmergencyAlert]
    }
`

module.exports = typeDefs