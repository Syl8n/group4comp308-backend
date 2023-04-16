const { gql } = require('apollo-server-express')
const typeDefs = gql`
    enum Role {
        NURSE
        PATIENT
    }
`
module.exports = typeDefs