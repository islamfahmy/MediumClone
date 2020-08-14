import React from 'react';
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

const articleReduer=(state=[],action)=>
{
   if(action.type==='article/init')
   	return articles
   return state

} 
export default articleReduer