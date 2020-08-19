import React from 'react';
import ArticleList from'./components/ArticleList'
import UsersList from'./components/UsersList'
import { useSelector, useDispatch } from 'react-redux'
import {getUsers} from './redux/actions/userActions'
import {init} from     './redux/actions/atricleActions'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/homepage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Header from './components/header'
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
  
    <div className="container" class="col-sm-12">
     <Header/>
       <Router>
     
       <Switch>
          <Route  path="/">
     <Home articles={articles}/>  
            </Route>
        </Switch>
     
       </Router>
 
   
   </div>
  )
}
export default App;

 /*   <Button onClick={handleUsersButton}>show users</Button>
<UsersList users={users}/>
  <ArticleList articles={articles}/>
    <button onClick={handleclick}>show articles</button>*/