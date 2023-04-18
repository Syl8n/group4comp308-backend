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
  const checklists = require('./app/graphql/checklist')
  const auths = require('./app/graphql/auth')

  const typeDefs = [
    ...scalarTypeDefs,
    enums,
    queries,
    mutations,
    members.typeDefs,
    vitalSigns.typeDefs,
    tips.typeDefs,
    emergencyAlerts.typeDefs,
    checklists.typeDefs,
    auths.typeDefs,
  ]
  const resolvers = [
    members.resolvers,
    vitalSigns.resolvers,
    tips.resolvers,
    emergencyAlerts.resolvers,
    checklists.resolvers,
    auths.resolvers,
  ]

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
      return { req, res };
    },
  });
  await server.start();

  const app = require('./config/middleware')(express());
  const db = require('./config/db')();

  server.applyMiddleware({ app, path: '/graphql', cors: false });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  })

}

start();