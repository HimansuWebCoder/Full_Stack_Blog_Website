import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import"./CreatePost.css";

function CreatePost() {
	const [ title, setTitle ] = useState("");
	const [ description, setDescription ] = useState("");
	const navigate = useNavigate();

	const titleInputHandler = (e) => {
		setTitle(e.target.value);
	}

	const descriptionInputHandler = (e) => {
		setDescription(e.target.value);
	}

	const postHandler = async (e) => {
		e.preventDefault(); 
		try {
            const res = await fetch('http://localhost:8000/api/posts', {
            	method: "post",
            	headers: {"Content-Type": "application/json"},
            	body: JSON.stringify({title: title, description: description}),
            	credentials: "include"
            })

            if (res.ok) {
                navigate('/home')
            }
		} catch (err) {
          console.log(`Something went wrong ${err}`)
		}
	}
	return(
        <div className="post-container">
          <div className="post-form-container">
	        <form className="post-form"  onSubmit={postHandler}>
	        	<input className="post-title-input-box" type="text" value={title} placeholder="Title" onChange={titleInputHandler} /><br/>
	        	<textarea className="post-description-box" value={description} placeholder="Write Your Story..." onChange={descriptionInputHandler}/><br/>
	        	<button className="post-submit-btn" type="submit">Publish</button>
	        </form>
	        </div>
        </div>
		)
}


export default CreatePost;