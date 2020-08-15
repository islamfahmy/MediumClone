import React from 'react';
import ArticleList from'./components/ArticleList'
import UsersList from'./components/UsersList'
import { useSelector, useDispatch } from 'react-redux'
import {getUsers} from './reducers/usersReducer'
const init ={type:'article/init'}
const App = ()=>
{
  const dispatch = useDispatch()
   const [users, articles] =useSelector(({users , articles}) => [users, articles])
   const handleclick=()=>
   {
    dispatch(init)
   }   
   const handleUsersButton=()=>
   {
    dispatch(getUsers)
   }
  return (
  
    <div>
       
    <button onClick={handleUsersButton}>show users</button>
    <UsersList users={users}/>
    <button onClick={handleclick}>show articles</button>
  <ArticleList articles={articles}/>
  </div>
  )
}
export default App;
