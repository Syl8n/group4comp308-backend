const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Mutation {
        addMember(form: MemberInput): Member,
        updateMember(
            _id: ID,
            form: MemberInput
        ): Member!
    }
`

module.exports = typeDefs