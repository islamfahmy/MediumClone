import React from 'react'
import {Link, Router} from "react-router-dom"
const home = ({articles})=>
{   //if(articles)
	const set = new Set()
	articles.map(a=>a.tags.map(t=>set.add(t)))
	  set.forEach(t=>console.log(t))
	  const tags = [...set]
	return(
        <div >
        <h1 className="jumbotron text-center" style={{backgroundColor: 'white'}}> 
        Welcome To Medium a place where you explore others opinions and experiences
        </h1>
        <h3 className=" text-center" style={{backgroundColor: 'white'}}>
         explore tags 
        </h3> 
        <div class="row">
    
        {tags.map(t=>{return( <div class="col-sm-1 bg-light"><Link style={{color:'black'}} to ={'/tags/'+t}>{t}</Link></div>)})}
	  
	 </div>
	   </div>
	    
    	)
}
export default home
