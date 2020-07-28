/* eslint-disable no-underscore-dangle */
const { ApolloServer, gql } = require('apollo-server');

const users = [
  {
    _id: 1,
    username: 'Musty',
    email: 'dummy@dummy.com',
    following: [2],
    followers: [3],
    recentlyViewedArticles: [],
    savedArticles: [],
    articles: [],
    perferences: ['web']
  },
  {
    _id: 2,
    username: 'Musty2',
    email: 'dummy2@dummy.com',
    following: [3],
    followers: [1],
    recentlyViewedArticles: [],
    savedArticles: [],
    articles: [],
    perferences: ['js']
  },
  {
    _id: 3,
    username: 'Musty3',
    email: 'dummy3@dummy.com',
    following: [1],
    followers: [],
    recentlyViewedArticles: [],
    savedArticles: [],
    articles: [],
    perferences: ['c++']
  }
];

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type User {
    _id: ID!
    username: String!
    email: String!
    following: [User]!
    followers: [User]!
    # recentlyViewedArticles: [Article]!
    # savedArticles: [Article]!
    # articles: [Article]!
    perferences: [String]!
  }

  type Query {
    users: [User]!
  }
`;

const resolvers = {
  Query: {
    users: () => users
  },
  User: {
    followers: ({ followers }) => users.filter((u) => followers.includes(u._id)),
    following: ({ following }) => users.filter((u) => following.includes(u._id))
  }
};
module.exports = { typeDefs, resolvers };
