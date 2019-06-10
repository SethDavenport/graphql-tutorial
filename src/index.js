const { GraphQLServer } = require('graphql-yoga')
const { resolvers } = require('./resolvers');
const { db } = require('./db');

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { db },
});

server.start(() => console.log(`Server is running on http://localhost:4000`))
