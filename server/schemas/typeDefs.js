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
        createdAt: String
        username: String
        reactions: [Reaction]
    }
    type Reaction {
        reactionId: ID
        reactionBody: String
        username: String
        createdAt: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        users: [User]
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(thoughtId: ID!): Thought
        reactions: [Reaction]
        reaction(reactionId: ID!): Reaction
        me: User
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addThought(thoughtText: String!): Thought
        addReaction(reactionId: ID!, reactionBody: String!): Reaction
        removeThought(thoughtId: ID!): Thought
        removeReaction(reactionId: ID!): Reaction
    }
`;

module.exports = typeDefs;