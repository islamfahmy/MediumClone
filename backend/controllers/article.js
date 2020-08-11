const { gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const Article = require('../models/Article')
const User = require('../models/User')
var mongoose = require('mongoose')
var articles=[
{
    title:"tittle 1",
    content:"this project is on fire" ,
    username:"Musty",
    userID: 1,
    likes :1,
    likeList:[{username:"Musty3" ,userID: 3}],
    comments :[{body:"try comments" ,username:"Musty3" ,userID: 3},{body:"comments working" ,username:"Musty2",userID: 2}],
    readers :1,
    tags :['js'], 
    _id:1
},
{
    title:"tittle 2",
    content:"Acing graphql" ,
    username:"Musty2",
    userID: 2,
    likes :1,
    likeList:[{username:"Musty" ,userID: 1}],
    comments :[],
    readers :1,
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
`
const resolvers = {
Query: {
    articles:async ()=> {
      const articlesa =await  Article.find({});
      console.log(articlesa)
      return articlesa

    }
  },
    Mutation: {
        addArticle:(root,args)=>
        {
         const user=users.find(u=>u._id.toString()===args.userID.toString())
         const article =new Article({ ...args,username:user.username,likes:0,readers:0,likeList:[],comments:[],tags:[]})
         article.userID= mongoose.Types.ObjectId( article.userID );
         article.save().then(result => {
         console.log('article saved!')
         mongoose.connection.close()
         }).catch((error) => {
         console.log('error saving:', error.message)
         throw new UserInputError(error.message);
          })
         return article;

        },
        likeArticle:(root,args)=>
        {
          article =  articles.find(a =>a._id.toString()===args.id.toString());
          article.likes++
          const user = users.find(u=>u._id.toString()===args.userID.toString())
          console.log(user)

          article.likeList=article.likeList.concat({username:user.username  ,userID:user._id})
          console.log(article.likeList)
          return article;
        },
        readArticle:(root,args)=>
        {
        const article =  articles.find(a =>a._id.toString()===args.id.toString());
        article.readers++
        return article
        },
        deleteArticle:(root,args)=>
        {      // delete from the user mosta 
           articles= articles.filter(a =>a._id.toString()===args.id.toString())
           const yesNo={done:true}
            return yesNo
        }



    
        
    }

}
module.exports = { typeDefs, resolvers };



