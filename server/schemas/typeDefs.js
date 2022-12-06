const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
  }
  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int
    commentCount: Int
  }
  type Comment {
    _id: ID
    commentText: String
    username: String
    createdAt: String
  }

  type Like {
    _id: ID
    createdAt: String
    username: String
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
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    likeThought(thoughtId: ID!): Thought
  }
`;

module.exports = typeDefs;
