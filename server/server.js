const express = require("express");
const session = require('express-session');
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const pg = require('pg');
const knex = require('knex');
const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 8080;

// const config = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   ssl: { rejectUnauthorized: false }, 
// }

const config = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  ssl: { rejectUnauthorized: true }, // for production only
  // ssl: { rejectUnauthorized: false }, // for development only
}

// DATABASE Config
const db = knex({
  client: 'pg',
  connection: config,
})

// Session Middleware for development only
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {secure: false, maxAge: 24 * 60 * 60 * 1000}
// }))

// Session Middleware for production only
// app.test("trust proxy", 1);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true, maxAge: 24 * 60 * 60 * 1000}
}))

// Other Middlewares
app.use(express.json());
app.use(cors({
	origin: ['http://localhost:3000', 'https://blog-app-frontend-gjg4grgyddbpb5f4.israelcentral-01.azurewebsites.net'],
	credentials: true,
}));

// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });



// Check user is logged-in or not
function isAuthenticated(req, res, next) {
	// console.log(req.session.email)
    if (process.env.NODE_ENV === "test") {
        next()
    } else if (req.session.email) {
		next()
	} else {
		return res.status(400).json({Status: "Unauthorized Access, Please login"})
	}
}


// GET Users All Blog Posts
app.get('/api/posts', isAuthenticated, (req, res) => {
   db('blog_posts')
       .select("*")
       .then(posts => {
       	  if (posts.length > 0) {
       	  	return res.status(200).json(posts);
       	  } else {
       	  	return res.status(404).json({message: "user posts not found"});
       	  }
       })
       .catch(error => {
       	console.error(`Database Error occurred: ${error.stack}`);
	    console.error(`Error Message: ${error.message}`); // Main error message
        console.error(`Error Code: ${error.code}`);       // Database-specific error code
        console.error(`Error Detail: ${error.detail}`);   // Additional info from Postgres
        console.error(`Error Hint: ${error.hint}`);
       	return res.status(400).json({Error:`Internal Server Error: ${error}`})
       })
})


// GET One User's Blog Post
app.get('/api/posts/:id', isAuthenticated, (req, res) => {
	const { id } = req.params;

	db('blog_posts')
	    .select("*")
	    .where({id})
	    .then(post => {
	    	if (post.length > 0) {
	    		return res.status(200).json(post)
	    	} else {
	    		return res.status(404).json({message: "user post not found"});
	    	}
	    })
	    .catch(error => {
	    	console.error(`Database Error occurred: ${error}`)
	    	return res.status(400).json({Error: `Internal Server Error: ${error}`})
	    })

})

// POST User Blog
app.post('/api/posts', isAuthenticated, (req, res) => {
   const { title, description } = req.body;

   if (!title && !description) {
   	 return res.status(400).json({Error: "title and description must required"});
   }

   db('blog_posts')
      .insert({title, description})
      .returning("*")
      .then(post => {
      	return res.status(201).json({message: "Blog posted successfully", blogPost: post})
      })
      .catch (error => {
      	console.error(`Database error occurred: ${error}`);
      	return res.status(400).json({Error: `Internal Server Error: ${error}`});
      })
})

// User Signup
app.post('/signup', (req, res) => {
   const { name, email, password } = req.body;

   if (!name || !email || !password) {
   	return res.status(400).json({Error: "name, email and password needed to signup"});
   }

   db("users")
     .insert({name, email, password})
     .returning("*")
     .then(user => {
     	req.session.email = email;
     	req.session.password = password;
     	return res.status(201).json({message: "User Signup successfully!"});
     })
     .catch(error => {
     	console.error(`Database Error Occurred: ${error}`);
        console.error(`Error Message: ${error.message}`); // Main error message
        console.error(`Error Code: ${error.code}`);       // Database-specific error code
        console.error(`Error Detail: ${error.detail}`);   // Additional info from Postgres
        console.error(`Error Hint: ${error.hint}`);
     	return res.status(400).json({Error: `Internal Server Error: ${error.message}`});
     })
})

// User Login
app.post('/login', (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
   	return res.status(400).json({Error: "Email and Password required to login"});
   }

   db('users')
     .select("*")
     .where({email: req.session.email, password: req.session.email})
     .then(user => {
     	return res.status(200).json({message: "User Login Successfully!"});
     })
     .catch(error => {
     	console.error(`Database Error Occurred: ${error}`);
        console.error(`Error Message: ${error.message}`); // Main error message
        console.error(`Error Code: ${error.code}`);       // Database-specific error code
        console.error(`Error Detail: ${error.detail}`);   // Additional info from Postgres
        console.error(`Error Hint: ${error.hint}`);
     	return res.status(400).json({Error: `Internal Server Error: ${error.message}`});
     })

})

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
})

module.exports = app;
