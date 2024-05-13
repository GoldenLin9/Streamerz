
import React, {useState} from "react"

import {useAuth} from "../context/AuthContext"
import { UserContext } from "./UserAuth.js"

export default function LogoutForm() {
	const {logout, currUser} = useAuth()

	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const value = React.useContext(UserContext)


	async function handleSubmit(e) {
		
		e.preventDefault()
		
		try {
			setError("")
			setLoading(true)
			await logout();

			value.setShowLogout(false);

		} catch(e) {
			setError(e.message)
		}

		console.log("done");

		setLoading(false);
	}

	return (
		<form onSubmit = {handleSubmit} >
			<strong>{error.message}</strong>

			{currUser && <h3>Hi {currUser.displayName}</h3>}
			
			<button hidden = {!value.showLogout} onClick = {()=> value.setShowLogout(!value.showLogout)} disabled = {loading}>
				Logout
			</button>
		
		</form>
	)
}