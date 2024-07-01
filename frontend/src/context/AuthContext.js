import React, {useState, useContext, useEffect} from "react"
import {auth} from "../firebase"
import { ChannelContext } from "../App"
import axiosInstance from '../axios'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}


export function AuthProvider({ children }) {
    
    const [currUser, setCurrUser] = useState()
    const [loading, setLoading] = useState(true)

    const { currChannel, setCurrChannel } = useContext(ChannelContext)

    
    function register(username, password) {

        console.log("going to register with ", username, password)

        axiosInstance.post('register/', {
            username: username,
            password: password
        })
    }

    function login(username, password) {

        axiosInstance.post('token/', {
            username: username,
            password: password
        }).then((response) => {
            
            localStorage.setItem('access_token', response.data.access)
            localStorage.setItem('refresh_token', response.data.refresh)
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token')


        }).catch((error) => {
            console.log(error)
        })

    }

    function logout() {
        
        const response = axiosInstance.post('logout/', {
            refresh_token: localStorage.getItem('refresh_token')
        })

        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        axiosInstance.defaults.headers['Authorization'] = null
    }

    function resetPassword(email) {
        return null;
    }

    function updateCurrUser(updates) {
        return null;
    }

    useEffect(() => {
        setLoading(false)

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