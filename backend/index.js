const { ApolloServer } = require('apollo-server');
const User = require('./controllers/article');
const mongoose = require('mongoose')

const url = 'mongodb+srv://eshta:eshta@cluster0.rhjzx.mongodb.net/medium?retryWrites=true&w=majority'

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const server = new ApolloServer({ typeDefs: User.typeDefs, resolvers: User.resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
