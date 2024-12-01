import { Link } from "react-router-dom";
import"./Nav.css";

function Nav() {
	return(
        <nav className="nav-container">
	        <Link className="nav-links" to="/home">Home</Link>
	        <Link className="nav-links" to="/home/create-post">
	          Create Post 
	          <img className="create-blog-icon" src="/assets/images/edit.png" />
	        </Link>
        </nav>
		)
}


export default Nav;