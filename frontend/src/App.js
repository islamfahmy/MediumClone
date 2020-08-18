import React from 'react';
import ArticleList from'./components/ArticleList'
import UsersList from'./components/UsersList'
import { useSelector, useDispatch } from 'react-redux'
import {getUsers} from './redux/actions/userActions'
import {init} from     './redux/actions/atricleActions'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/homepage'
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
  
    <div className="container">
     <Home articles={articles}/>  
    <Button onClick={handleUsersButton}>show users</Button>
    <UsersList users={users}/>
    <button onClick={handleclick}>show articles</button>
  <ArticleList articles={articles}/>
  </div>
  )
}
export default App;
