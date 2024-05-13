
import React, {useState, useRef} from "react"

import {useAuth} from "../context/AuthContext"



export default function LoginForm({show, setShow}) {
	
	const emailRef = useRef()
	const passwordRef = useRef()

	const {login, currUser} = useAuth()

	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)


	async function handleSubmit(e) {
		
		e.preventDefault()
		
		let email = emailRef.current.value;
		let pswd = passwordRef.current.value;

		
		try {
			setError("")
			setLoading(true)
			await login(email, pswd);

            // clear forms when success

            emailRef.current.value = "";
            passwordRef.current.value = "";

			setShow(false);

			// get userIDToken
			// await updateProfile(currUser, {displayName: "GOGOG"})

			// currUser.getIdToken().then((token) => {
			// 	console.log(token);
			// })

			
		} catch(e) {
			console.log("heree", e)
			setError(e.message)
		}
		
		setLoading(false);
	}

	// implement display name with this logic later
	// if (currUser) {
	// 	updateProfile(currUser, {displayName: "GOGOGO"});
	// 	console.log("updated display name: " + currUser.displayName);
	// }

	if (currUser) {
		// console.log(currUser)
		// firebase.auth().onAuthStateChanged.getIdtoken(true).then((idToken) => {
		// 	console.log(idToken);
		// })
	}

	return (
		<>
			{show &&

				<form onSubmit = {handleSubmit}>
					<strong>{error}</strong>
					<p>Curr Email: {currUser && currUser.email}</p>
					<div className = "email">
						<label htmlFor = "email">Email: </label>
						<input ref = {emailRef} type = "email" name = "email"></input>
					</div>

					<div className = "pswd">
						<label htmlFor = "password">Password: </label>
						<input ref = {passwordRef} type = "password" name = "password"></input>
					</div>

					
					<button disabled = {loading}>
						Login
					</button>
				
				</form>
			}
		</>
	)
}