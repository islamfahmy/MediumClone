/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
const { gql, UserInputError } = require('apollo-server');
const bcrypt = require('bcrypt');
const config = require('../util/config');
const User = require('../models/User');

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
    #recentlyViewedArticles: [Article]!
    #savedArticles: [Article]!
    articles: [Article]!
    perferences: [String]!
  }

  extend type Query {
    users(username: String): [User]!
    currentUser: User
  }
  extend type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    followUser(id: String!): User!
    unFollowUser(id: String!): User!
    addPerference(perference: String!): User!
    removePerference(perference: String!): User!
  }
`;
const id = '5f33131197bd875163a08fdf';

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
    currentUser: async (root, args, context) => await User.findById(id)
  },
  Mutation: {
    createUser: async (root, args) => {
      const newUser = new User({
        username: args.username,
        email: args.email,
        password: await bcrypt.hash(args.password, Number(config.PASSWORD_SALT))
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
    unFollowUser: async (root, args, context) => {
      try {
        await User.findByIdAndUpdate(args.id,
          { $pull: { followers: id } });
        return await User.findByIdAndUpdate(id, { $pull: { following: args.id } }, { new: true });
      }
      catch (error) {
        throw new UserInputError(error.message);
      }
    },
    followUser: async (root, args, context) => {
      const currentUser = await User.findById(id);
      currentUser.following = currentUser.following.concat(args.id);
      try {
        await User.findByIdAndUpdate(args.id, { $push: { followers: id } });
        return await User.findByIdAndUpdate(id, { $push: { following: id } }, { new: true });
      }
      catch (error) {
        throw new UserInputError(error.message);
      }
    },
    addPerference: async (root, args, context) => {
      try {
        return await User.findByIdAndUpdate(id, { $push: { perferences: args.perference } },
          { new: true });
      }
      catch (error) {
        throw new UserInputError();
      }
    },
    removePerference: async (root, args, context) => {
      try {
        return await User.findByIdAndUpdate(id, { $pull: { perferences: args.perference } },
          { new: true });
      }
      catch (error) {
        throw new UserInputError();
      }
    }
  }
};
module.exports = { typeDefs, resolvers };
