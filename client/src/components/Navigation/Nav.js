import { Link } from "react-router-dom";
import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import"./Nav.css";

function Nav() {
	const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
     };

	const handleClose = () => {
	    setAnchorEl(null);
	  };

	return(
        <nav className="nav-container">
	        <Button
	        id="basic-button"
	        aria-controls={open ? 'basic-menu' : undefined}
	        aria-haspopup="true"
	        aria-expanded={open ? 'true' : undefined}
	        onClick={handleClick}
	      >
	        Menu
	      </Button>

		 <Menu
	        id="basic-menu"
	        anchorEl={anchorEl}
	        open={open}
	        onClose={handleClose}
	        MenuListProps={{
	          'aria-labelledby': 'basic-button',
	        }}
	      >
	        <MenuItem className='menu-item-container' onClick={handleClose}>
	        	<Link className="menu-nav-links" to="/home">Home</Link>
	        </MenuItem>
	        <MenuItem onClick={handleClose}>
	        	<Link className="menu-nav-links" to="/home/create-post">
	          Create Post 
	          <img className="create-blog-icon" src="/assets/images/edit.png" alt="edit.png" />
	        </Link>
	        </MenuItem>
	      </Menu>

	        <Link className="nav-links" to="/home">Home</Link>
	        <Link className="nav-links" to="/home/create-post">
	          Create Post 
	          <img className="create-blog-icon" src="/assets/images/edit.png" alt="edit.png" />
	        </Link>
        </nav>
		)
}


export default Nav;

  