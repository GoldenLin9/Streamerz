import React, {useState, useEffect } from 'react'
import RegisterForm from "./RegisterForm.js"
import LoginForm from"./LoginForm.js"
import LogoutForm from "./LogoutForm.js"
import {useAuth} from "../context/AuthContext"

import "../styles/userAuth.css"


export const UserContext = React.createContext();

export default function UserAuth() {


    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    const [showLoginRegister, setShowLoginRegister] = useState(false);

    const [registerName, setRegisterName] = useState("secondary");
    const [loginName, setLoginName] = useState("secondary");

    const {currUser} = useAuth();

    console.log(showLogin)
    console.log(currUser)

    const value = {
        showLogin,
        setShowLogin,

        showRegister,
        setShowRegister,

        showLogout,
        setShowLogout
    }

    useEffect(() => {
        if (currUser) {
            setShowLogout(true);

            setShowLogin(false);
            setShowRegister(false);

            setShowLoginRegister(false);
        } else if (!currUser) {
            setShowLogout(true);

            setShowLogin(false);
            setShowRegister(false);

            setShowLoginRegister(true);
        }
    }, [currUser])

    return (
    <aside>

        <nav>

            <button hidden = {!showLoginRegister}
                    className = {loginName}

                    onClick = {()=> {
                setShowLogin(!showLogin)
                setShowRegister(false);
                setRegisterName("secondary");
                setLoginName("primary");

                if (showLogin === true)
                    setLoginName("secondary");
            }}>
                Login
            </button>


            <button hidden = {!showLoginRegister} 
                    className = {registerName}

                    onClick = {()=> {
                setShowRegister(!showRegister)
                setShowLogin(false);
                setLoginName("secondary");
                setRegisterName("primary");

                if (showRegister === true)
                    setRegisterName("secondary");
            }}>
                Register
            </button>

        </nav>
            
            <UserContext.Provider value = {value}>

                <LoginForm show = {showLogin} setShow = {setShowLogin}/>
                
                <RegisterForm show = {showRegister} setShow = {setShowRegister}/>

                <LogoutForm />

            </UserContext.Provider>

    </aside>
  )
}
