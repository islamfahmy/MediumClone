const { gql } = require('apollo-server');
const articles=[
{
    title:"tittle 1",
    content:"this project is on fire" ,
    user: 1,
    likes :2,
    comments :[{body:"try comments" ,User:1},{body:"comments working" ,User:2}],
    readers :[3,2],
    tags :['js'],
    _id:1
},
{
    title:"tittle 2",
    content:"Acing graphql" ,
    user: 2,
    likes :2,
    comments :[],
    readers :[1,2],
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
   User:String!
},
type Article{
    _id:ID!
    title:String!
    content:String!
    user:String!
    likes:Int!
    comments: [Comment]  
   #readers:[String!]
    tags:[String!]
},
type  Query{
    articles:[Article!]

}
`
const resolvers = {
Article:{
    user :(u)=>(users.find((u1)=>u1.id===u.id)).username,
    //readers :({readers})=> (users.filter((u) => readers.includes(u._id)))

},
Comment:{
User :(u)=>(users.find((u1)=>u1.id===u.id)).username

},
Query: {
    articles:()=> articles
    }

}
module.exports = { typeDefs, resolvers };



