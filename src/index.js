const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const typeDefs = require('./schema');
const { getUserId } = require('./utils');
const app = express();
const prisma = new PrismaClient();
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Task = require('./resolvers/Task');
app.use(express.json());

const resolvers = {
  Query,
  Mutation,
  User,
  Task,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
