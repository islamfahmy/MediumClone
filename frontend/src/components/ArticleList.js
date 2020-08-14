import React from 'react';
const ArticleList=({articles})=>
{  console.log(articles)
	if(!articles)
		return null
	return( 
	   <div>
		{articles.map(a=><div>
			<h2>{a.title} </h2>Author :{a.username} likes:{a.likes} 
		</div>)}
		</div> 
		)
		
} 
export default ArticleList