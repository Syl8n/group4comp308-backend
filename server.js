process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.GRAPHQL_PLAYGROUND_ENABLED = true;

const start = async () => {
  const express = require('express');
  const { ApolloServer } = require('apollo-server-express')

  const queries = require('./app/graphql/queries')
  const mutations = require('./app/graphql/mutations')
  const members = require('./app/graphql/member')
  const enums = require('./app/graphql/enum')

  const typeDefs = [
    enums,
    queries,
    mutations,
    members.typeDefs,
  ]
  const resolvers = [
    members.resolvers,
  ]

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = require('./config/middleware')(express());
  const db = require('./config/db')();

  server.applyMiddleware({ app, path: '/' });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  })

}

start();