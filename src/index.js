const { GraphQLServer } = require('graphql-yoga')
const { resolvers } = require('./resolvers');
const { loadSchema } = require('./load-schema');

(async function main() {
  const typeDefs = await loadSchema('./schema.graphql');
  const server = new GraphQLServer({ typeDefs, resolvers });

  server.start(() => console.log(`Server is running on http://localhost:4000`))
})();
