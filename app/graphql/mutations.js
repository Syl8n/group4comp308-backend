const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Mutation {
        addMember(form: MemberInput): Member,
        updateMember(
            _id: ID,
            form: MemberInput
        ): Member!
        addVitalSign(form: VitalSignInput): VitalSign
        updateVitalSign(_id: ID, form: VitalSignInput): VitalSign
        addTip(tip: String): Tip
        addEmergencyAlert: EmergencyAlert
    }
`

module.exports = typeDefs