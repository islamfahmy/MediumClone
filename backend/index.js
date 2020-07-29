const { ApolloServer } = require('apollo-server');
const User = require('./controllers/article');

const server = new ApolloServer({ typeDefs: User.typeDefs, resolvers: User.resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
