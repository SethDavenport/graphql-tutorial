const { GraphQLServer } = require('graphql-yoga')
const { db } = require('./db');
const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');
const Subscription = require('./resolvers/subscription');
const Link = require('./resolvers/link');
const User = require('./resolvers/user');

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Link,
    User,
  },
  context: request => ({ ...request,  db }),
});

server.start(() => console.log(`Server is running on http://localhost:4000`))
