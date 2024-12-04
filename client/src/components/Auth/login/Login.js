import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import"./Login.css";

function Login() {
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const navigate = useNavigate();

	const emailHandler = (e) => {
		setEmail(e.target.value);
	}

	const passwordHandler = (e) => {
		setPassword(e.target.value);
	}

	const loginHandler = async(e) => {
		e.preventDefault();
		try {
            const res = await fetch('https://blog-app-backend-epcqfqfmd6bed7a0.israelcentral-01.azurewebsites.net/login', {
            	method:"post",
            	headers: {"Content-Type": "application/json"},
            	body: JSON.stringify({
            		email: email,
            		password: password
            	}),
            	credentials: "include"
            })

            if (res.ok) {
                navigate('/home')
            }

		} catch (error) {
			console.log(`Something went wrong ${error}`)
		}
	}

	return(
        <div className="login-container">
           <div className="login-sub-container">
	           	<form onSubmit={loginHandler} className="login-form">
	           		<label htmlFor="email">Email</label>
	           		<input id="email" name="email" className="login-input-box" value={email} onChange={emailHandler} type="text" placeholder="Enter Your Email" /><br/>
	           		<label  htmlFor="password">Password</label>
	           		<input id="password" name="password" className="login-input-box" value={password} onChange={passwordHandler} type="text" placeholder="Enter Your Password" />
	           		<button id="login-submit-btn" type="submit">Submit</button>
	           	</form>
           </div>
        </div>
		)
}


export default Login;