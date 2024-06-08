import React, {useState, useContext, useEffect} from "react"
import {auth} from "../firebase"
import { ChannelContext } from "../App"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}


export function AuthProvider({ children }) {
    
    const [currUser, setCurrUser] = useState()
    const [loading, setLoading] = useState(true)

    const { currChannel, setCurrChannel } = useContext(ChannelContext)

    
    function register(email, password, username) {
        auth.createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
            createdUser.user.updateProfile({
                displayName: username
            })

            const data = {
                "uid": createdUser.user.uid,
                "username": username
            }

            console.log("sending ", data)
            fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                
                body: JSON.stringify(data)
            })


        })
    }

    function login(email, password) {

        return auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user

            return fetch("/api/list/channels/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({"uid": user.uid})
            })
            .then(response => response.json())
            .then(data => data.channels)
        })
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateCurrUser(updates) {
        return auth.updateProfile(currUser, updates);
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log("before: ", user)
            console.log("before: ", currUser)
            setCurrUser(user)
            console.log("after: ", currUser)
            setLoading(false)
            console.log("SET USER")
        })

        return unsubscribe
    }, [currUser])

    const value = {
        currUser,
        register,
        login,
        logout,
        resetPassword,
        updateCurrUser,
        
    }


    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}