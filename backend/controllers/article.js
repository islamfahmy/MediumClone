/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */
const { gql, UserInputError } = require('apollo-server');
var mongoose = require('mongoose');
const Article = require('../models/Article');
const User = require('../models/User');

var articles = [
  {
    title: 'tittle 1',
    content: 'this project is on fire',
    username: 'Musty',
    userID: 1,
    likes: 1,
    likeList: [{ username: 'Musty3', userID: 3 }],
    comments: [{ body: 'try comments', username: 'Musty3', userID: 3 }, { body: 'comments working', username: 'Musty2', userID: 2 }],
    readers: 1,
    tags: ['js'],
    _id: 1
  },
  {
    title: 'tittle 2',
    content: 'Acing graphql',
    username: 'Musty2',
    userID: 2,
    likes: 1,
    likeList: [{ username: 'Musty', userID: 1 }],
    comments: [],
    readers: 1,
    tags: ['c++'],
    _id: 1
  }];
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
type Comment{
   body:String!
   username:String!
   userID:ID!
},
type yesNo{
    done:Boolean!
}
type List{
  username:String
   userID:ID!  
}
type Article{
    _id:ID!
    title:String!
    content:String!
    username:String!
    userID:ID!
    likes:Int!
    likeList:[List!]
    comments: [Comment]  
    readers:Int!
    tags:[String!]
},
 type  Query{
    articles:[Article!]

}
type Mutation {
   addArticle(
title:String!
content:String!
userID:ID!
tags:[String!]
   ):Article
likeArticle(
    userID:ID!
   id:ID!
   ):Article
readArticle(
   id:ID!
):Article
 deleteArticle(id:ID!)
 :yesNo

 }
`;
const user = { username: 'test', id: '5f33131197bd875163a08fdf' };

const resolvers = {
  Query: {
    articles: async () => await Article.find({}).lean()
  },
  Mutation: {
    addArticle: async (root, args) => {
      const article = new Article({
        ...args, username: user.username, userID: args.userID
      });
      try {
        const savedArticle = await article.save();
        await User.findByIdAndUpdate(args.userID, { $push: { articles: article.id } });
        return savedArticle;
      }
      catch (error) {
        throw new UserInputError(error);
      }
    },
    likeArticle: async (root, args) => {
      const article = await Article.findById(args.id, 'likeList');
      if (article.likeList.find((a) => a.userID.toString() === user.id.toString())) {
        throw new UserInputError('already liked');
      }

      return await Article.findByIdAndUpdate(args.id,
        { $push: { likeList: { userID: args.userID, username: user.username } } }, { new: true });
    },
    readArticle: async (root, args) => await Article.findByIdAndUpdate(args.id,
      { $inc: { readers: 1 } }),
    deleteArticle: async (root, args) => {
      try {
        const article = await Article.findByIdAndDelete(args.id);
        await User.findByIdAndUpdate(article.userID, { $pull: { articles: article._id } });
       return {done:true}
      }
      catch (error) {
        throw new UserInputError(error);
         return {done:false}
      
      }

    }
  }
};
module.exports = { typeDefs, resolvers };
