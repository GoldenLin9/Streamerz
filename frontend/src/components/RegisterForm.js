
import React, {useState, useRef} from "react"

import {useAuth} from "../context/AuthContext"

export default function RegisterForm({show, setShow}) {
	
	const emailRef = useRef()
	const usernameRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()

	const {register, currUser} = useAuth()

	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)


	async function handleSubmit(e) {
		
		e.preventDefault()
		
		let email = emailRef.current.value;
		let username = usernameRef.current.value;
		let pswd1 = passwordRef.current.value;
		let pswd2 = passwordConfirmRef.current.value;
		
		if (pswd1 !== pswd2) {
			return setError("Passwords do not match")
		}
		
		try {
			setError("")
			setLoading(true)
			await register(email, pswd1)

			// clear form once registered successfully
			email.current.value = ""
			pswd1.current.value = ""
			pswd2.current.value = ""
			username.current.value = ""

			setShow(false);
		} catch(e) {
			console.log(e)
			setError(e)
		}

		setLoading(false);
	}

	// if (currUser) {

	// }


	return (
		<>
			{show &&
				<form onSubmit = {handleSubmit}>
					<strong>{error.message}</strong>
					<p>Curr Email: {currUser && currUser.displayName}</p>
					<div className = "email">
						<label htmlFor = "email">Email: </label>
						<input ref = {emailRef} type = "email" name = "email"></input>
					</div>

					<div className = "username">
						<label htmlFor = "username">Username: </label>
						<input ref = {usernameRef} type = "username" name = "username"></input>
					</div>

					<div className = "pswd">
						<label htmlFor = "password">Password: </label>
						<input ref = {passwordRef} type = "password" name = "password"></input>
					</div>
					
					<div className = "pswdConf">
						<label htmlFor = "password-confirm">Re-Enter Password: </label>
						<input ref = {passwordConfirmRef} type = "password" name = "password-confirm"></input>
					</div>
					<button disabled = {loading}>
						Register
					</button>
				</form>
			}
		</>
	)
}