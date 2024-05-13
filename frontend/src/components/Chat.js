import '../styles/chat.css'
import '../styles/shared.css'
import UserAuth from "./UserAuth.js"
import { AuthProvider } from '../context/AuthContext'


export default function Chat({ id }) {
    

    return(
        <div id = {id}>
            <AuthProvider>
                
                <UserAuth />

            </AuthProvider>

            <h1 id = "ChatHeader"> Chat here </h1>

        </div>
    )
}