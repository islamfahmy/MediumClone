const { gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
/*const articles = require('../models/Article')
const user = require('../models/User')*/
const articles=[
{
    title:"tittle 1",
    content:"this project is on fire" ,
    username:"Musty",
    userID: 1,
    likes :2,
    comments :[{body:"try comments" ,username:"Musty3" ,userID: 3},{body:"comments working" ,username:"Musty2",userID: 2}],
    readers :[{username:"Musty3" ,userID: 3}],
    tags :['js'],
    _id:1
},
{
    title:"tittle 2",
    content:"Acing graphql" ,
    username:"Musty2",
    userID: 2,
    likes :2,
    comments :[],
    readers :[{username:"Musty" ,userID: 1}],
    tags :['c++'],
    _id:1  
}]
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
]

const typeDefs = gql`
type Comment{
   body:String!
   username:String!
   userID:ID!
},
type Reader{
  username:String!
   userID:ID!  
}
type Article{
    _id:ID!
    title:String!
    content:String!
    username:String!
    userID:ID!
    likes:Int!
    comments: [Comment]  
    readers:[Reader!]
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
   id:ID!
   ):Article
readArticle(
   userID:ID!
   id:ID!
):Article


 }
`
const resolvers = {
Query: {
    articles:()=> articles

    },
    Mutation: {
        addArticle:(root,args)=>
        {
         const user=users.find(u=>u._id.toString()===args.userID.toString())
         const article ={ ...args, _id: uuid() ,username:user.username,likes:0 }
         articles.concat(article)
         return article;

        },
        likeArticle:(root,args)=>
        {
          article =  articles.find(a =>a._id.toString()===args.id.toString());
          article.likes++
          return article;
        },
        readArticle:(root,args)=>
        {
        const article =  articles.find(a =>a._id.toString()===args.id.toString());
        const user=users.find(u=>u._id.toString()===args.userID.toString())
        article.readers=article.readers.concat({username:user.username,userID:args.userID})
        console.log(article.readers)
        return article
        }
// to do add this article in history 

        
    }

}
module.exports = { typeDefs, resolvers };



