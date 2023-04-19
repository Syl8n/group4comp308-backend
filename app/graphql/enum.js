const { gql } = require('apollo-server-express')
const typeDefs = gql`
    enum Role {
        NURSE
        PATIENT
    }
    enum Severity {
        MILD
        SEVERE
        CRITICAL
      }
  
      enum Status {
        ACTIVE
        RESOLVED
      }
`
module.exports = typeDefs