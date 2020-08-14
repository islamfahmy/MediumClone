import React from 'react';
import ArticleList from'./components/ArticleList'
import { useSelector, useDispatch } from 'react-redux'
const init ={type:'article/init'}
const App = ()=>
{
  const dispatch = useDispatch()
   const articles =useSelector(state => state)
   const handleclick=()=>
   {
    dispatch(init)
   }
  return (
  
    <div> 
    <button onClick={handleclick}>show </button>
  <ArticleList articles={articles}/>
  </div>
  )
}
export default App;
