process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.GRAPHQL_PLAYGROUND_ENABLED = true;

const start = async () => {
  const express = require('express');
  const { ApolloServer } = require('apollo-server-express')

  const { typeDefs: scalarTypeDefs } = require('graphql-scalars');
  const queries = require('./app/graphql/queries')
  const mutations = require('./app/graphql/mutations')
  const members = require('./app/graphql/member')
  const enums = require('./app/graphql/enum')
  const vitalSigns = require('./app/graphql/vitalsign')
  const tips = require('./app/graphql/tip')
  const emergencyAlerts = require('./app/graphql/emergencyAlert')

  const typeDefs = [
    ...scalarTypeDefs,
    enums,
    queries,
    mutations,
    members.typeDefs,
    vitalSigns.typeDefs,
    tips.typeDefs,
    emergencyAlerts.typeDefs,
  ]
  const resolvers = [
    members.resolvers,
    vitalSigns.resolvers,
    tips.resolvers,
    emergencyAlerts.resolvers,
  ]

  const server = new ApolloServer({
    typeDefs, resolvers, context: async ({ req }) => ({
      req: req,
      user: req.user,
    })
  });
  await server.start();

  const app = require('./config/middleware')(express());
  const db = require('./config/db')();

  server.applyMiddleware({ app, path: '/' });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  })

}

start();