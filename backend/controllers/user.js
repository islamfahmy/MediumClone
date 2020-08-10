/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
const { gql, UserInputError } = require('apollo-server');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { create } = require('../models/User');
mongodb+srv://eshta:eshta@cluster0.rhjzx.mongodb.net/medium?retryWrites=true&w=majority
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
    users(username: String): [User]!
    currentUser: User
  }
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    followUser(id: String!): User!
    unfollowUser(id: String!): User!
  }
`;

const resolvers = {
  Query: {
    users: async (root, args) => {
      if (args.username) {
        const user = await User.find({ username: args.username }).lean();
        return user;
      }
      const allUsers = await User.find({}).lean();
      return allUsers;
    },
    currentUser: async (root, args, context) => await User.findById(context.id)
  },
  Mutation: {
    createUser: async (root, args) => {
      const newUser = new User({
        username: args.username,
        email: args.email,
        passwordHash: args.password
      });
      try {
        await newUser.save();
        return newUser;
      }
      catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
        throw new UserInputError(error.message);
      }
    },
    followUser: async (root, args, context) => {
      const currentUser = await User.findById(context.id);
      currentUser.following = currentUser.followeing.filter((u) => u !== args.id);
    },
    unfollowUser: async (root, args, context) => {
      const currentUser = await User.findById(context.id);
      currentUser.followers = currentUser.followers.concat(args.id);
    },
    addPerfrence: async (root, args, context) => {
      const currentUser = await User.findById(context.id);
      currentUser.perferences = currentUser.perferences.concat(args.perference);
    },
    removePerfrence: async (root, args, context) => {
      const currentUser = await User.findById(context.id);
      currentUser.perferences = currentUser.perferences.filter((p) => p !== args.perference);
    }
  }
};
module.exports = { typeDefs, resolvers };
