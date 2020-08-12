const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
var _ = require('lodash');
const User = require('./controllers/user');
const Article = require('./controllers/article');
const config = require('./util/config');

const resolvers = _.merge({}, Article.resolvers, User.resolvers);

const MongoURI = config.MONGODB_PROD_URI;
console.log('connecting to', MongoURI);

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const server = new ApolloServer({ typeDefs: [Article.typeDefs, User.typeDefs], resolvers });
console.log(server);
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
