const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getTasks: [Task]
  }
  type Task {
    id: ID!
    description: String!
    completed: Boolean!
    postedBy: User
  }
  type User {
    id: ID!
    email: String!
    tasks: [Task]
  }
  type Mutation {
    createTask(description: String!, completed: Boolean!): Task!
    signup(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    updateTask(description: String!, completed: Boolean!): Task
    deleteTask(id: ID!): Task
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
