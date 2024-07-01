
import React, {useState, useRef} from "react"

import {useAuth} from "../context/AuthContext"


export default function LoginForm({show, setShow}) {
	
	const usernameRef = useRef()
	const passwordRef = useRef()

	const {login, currUser} = useAuth()

	// const { channels, setChannels } = useContext(ChannelContext)


	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)


	async function handleSubmit(e) {
		
		e.preventDefault()
		
		let username = usernameRef.current.value;
		let pswd = passwordRef.current.value;

		
		try {
			setError("")
			setLoading(true)

			login(username, pswd)

            // clear forms when success

            usernameRef.current.value = "";
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
					<p>Curr Username: ???</p>
					<div className = "username">
						<label htmlFor = "username">Username: </label>
						<input ref = {usernameRef} type = "username" name = "username"></input>
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