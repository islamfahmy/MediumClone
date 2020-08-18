import React from 'react'

const home = ({articles})=>
{   //if(articles)
	const tags = new Set()
	articles.map(a=>a.tags.map(t=>tags.add(t)))
	return(
        <div >
        <h1 class="jumbotron text-center" style={{backgroundColor: 'white'}}> 
        Welcome To Medium a place where you explore others opinions and experiences
        </h1>
        <h3 class=" text-center" style={{backgroundColor: 'white'}}>
         explore
        </h3> 

        </div>
    	)
}
export default home
