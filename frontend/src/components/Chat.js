import '../styles/chat.css'
import '../styles/shared.css'
import UserAuth from "./UserAuth.js"


export default function Chat({ id }) {
    

    return(
        <div id = {id}>

            <UserAuth />

            <h1 id = "ChatHeader"> Chat here </h1>

        </div>
    )
}