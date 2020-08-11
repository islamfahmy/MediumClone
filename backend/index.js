const { ApolloServer } = require('apollo-server')
const User = require('./controllers/user');
const Article = require('./controllers/article')
const mongoose = require('mongoose')
var _ = require('lodash');
const resolvers= _.merge({},Article.resolvers,User.resolvers)

const url = 'mongodb+srv://eshta:eshta@cluster0.rhjzx.mongodb.net/medium?retryWrites=true&w=majority'

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const server = new ApolloServer({ typeDefs: [Article.typeDefs,User.typeDefs], resolvers:resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
