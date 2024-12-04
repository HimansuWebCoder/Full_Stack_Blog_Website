import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import Nav from '../Navigation/Nav';
import"./Home.css";

function Home() {
   const [ posts, setPosts ] = useState([]);
   const location = useLocation();

   useEffect(() => {
   	 const fetchBlogPosts = async() => {
   	 	try {
		   	 	const res = await fetch('http://localhost:8080/api/posts',{
		   	 		method: 'get',
		   	 		credentials: "include"
		   	 	});

			   	 	if (res.ok) {
			   	 		const blogPosts = await res.json();
			   	 		if (blogPosts.length > 0) {
			   	 			console.log(blogPosts);
			   	 			setPosts(blogPosts)
			   	 		}
			   	 	} else {
			   	 		console.log("Failed to fetch");
			   	 	}
	   	 } catch (error) {
   	 		console.log(`Something went wrong ${error}`);
     	  }

   	 	} 

   	 fetchBlogPosts();
   }, [location])
	return(
        <div className="blogposts-main-container">
        <Nav />
        <div className="blogposts-container">
        	{posts.map((blogpost, index) => (
                  <div className="blogpost-card-container" key={blogpost.id}>
                  	 <h1>{blogpost.title}</h1>
                  	 <p>{blogpost.description}</p>
                  </div>
        		))}
        </div>
        <Outlet />
        </div>
		)
}


export default Home;