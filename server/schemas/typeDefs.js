const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        thoughts: [Thought]!
        friends: [User]!
    }
    type Thought {
        _id: ID
        thoughtText: String
        createAt: String
        username: String
        reactions: [Reaction]
    }
    type Reaction {
        reactionId: ID
        reactionBody: String
        username: String
        createdAt: String
    }
    type Query {
        users: [User]
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(thoughtId: ID!): Thought
        reactions: [Reaction]
        reaction:(reactionId: ID!): Reaction
        me: User
    }

`;

module.exports = typeDefs;