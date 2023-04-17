const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type AuthPayload {
        member: Member!
        token: String!
    }

    type Mutation {
        addMember(form: MemberInput): Member,
        updateMember(
            _id: ID,
            form: MemberInput
        ): Member!
        addVitalSign(form: VitalSignInput): VitalSign
        updateVitalSign(_id: ID, form: VitalSignInput): VitalSign
        login(username: String!, password: String!):  AuthPayload
        addTip(tip: String): Tip
    }
`

module.exports = typeDefs