import React, {useState, useContext, useEffect} from "react"
import {auth} from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}


export function AuthProvider({ children }) {
    
    let [currUser, setCurrUser] = useState()
    const [loading, setLoading] = useState(true)
    
    function register(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
            createdUser.user.updateProfile({
                displayName: "BOGO"
            })

            const data = {
                "uid": createdUser.user.uid
            }
            console.log(data)
            fetch("/api/regist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                
                body: JSON.stringify(data)
            })
        })
    }

    function login(email, password) {
        let ret = auth.signInWithEmailAndPassword(email, password);
        return ret;
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
            setCurrUser(user)
            setLoading(false)
            console.log("SET USER")
        })

        return unsubscribe
    }, [])

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