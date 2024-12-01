import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import"./Signup.css";

function Signup() {
	const [ name, setName ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const navigate = useNavigate();

	const nameHandler = (e) => {
       setName(e.target.value);
	}

	const emailHandler = (e) => {
		setEmail(e.target.value);
	}

	const passwordHandler = (e) => {
		setPassword(e.target.value);
	}

	const signupHandler = async(e) => {
		e.preventDefault();
		try {
            const res = await fetch('http://localhost:8000/signup', {
            	method:"post",
            	headers: {"Content-Type": "application/json"},
            	body: JSON.stringify({
            		name: name,
            		email: email,
            		password: password
            	}),
            	credentials: "include"
            })

            if (res.ok) {
                navigate('/home')
            }

		} catch (error) {
			console.log("Something went wrong")
		}
	}

	return(
        <div className="signup-container">
           <div className="signup-sub-container">
           	<form onSubmit={signupHandler} className="signup-form">
           	<label htmlfor="name">Name</label>
           	<input className="signup-input-box" type="text" id="name" value={name} onChange={nameHandler} name="name" placeholder="Enter Your Name" /><br/>
           	<label htmlfor="email">Email</label>
           		<input id="email" name="email" className="signup-input-box" value={email} onChange={emailHandler} type="text" placeholder="Enter Your Email" /><br/>
           	<label  htmlfor="password">Password</label>
           		<input id="password" name="password" className="signup-input-box" value={password} onChange={passwordHandler} type="text" placeholder="Enter Your Password" />
           		<button id="signup-submit-btn" type="submit">Submit</button>
           	</form>
           </div>
        </div>
		)
}


export default Signup;