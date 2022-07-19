const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const typeDefs = require('./schema');
const resolvers = require('./resolvers.js');

const server = new ApolloServer({ typeDefs, resolvers, debug: true });


server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
