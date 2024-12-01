import { Outlet, Link } from 'react-router-dom';
import"./Layout.css";

function Layout() {
	return(
        <div className="auth-container">
	        <Link className="login-link " to="/login">Login</Link>
	        <Link className="login-link" to="/signup">Signup</Link>
	        <Outlet/>
        </div>
	)
}


export default Layout;