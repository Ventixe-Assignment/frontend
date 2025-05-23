import React, { createContext, useState } from "react";
export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const apiConnection = `https://localhost:7269/api/authentications`
    const [loginStatus, setLoginStatus] = useState(null)
    const [registerStatus, setRegisterStatus] = useState(null)
    const [loginFormData,setLoginFormData] = useState({ email: '', password: '', rememberMe: false })
    const [registerFormData, setRegisterFormData] = useState({ email: '', password: '', confirmPassword: '' })


    const postLogin = async () => {
        try {
            const res = await fetch(`${apiConnection}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginFormData)
            })

            if(!res.ok) {
                console.log('Login Failed!')
                setLoginStatus('error')
                return false
   
            } else {
                console.log('Login Successful')
                setLoginStatus('success')
                return true
            }
        }
        catch(error) {
            console.error('Error during login attempt', error)
            setLoginStatus('error')
            return false
        }
    }

    const postRegister = async () => {
        try {
            const res = await fetch(`${apiConnection}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerFormData)
            })

            if(!res.ok) {
                console.log('Registration Failed!')
                setRegisterStatus('error')
   
            } else {
                console.log('Account created successfully')
                setRegisterStatus('success')
   
            }
        }
        catch(error) {
            console.error('Error during registration attempt', error)
            setRegisterStatus('error')
        }
    }

    const postLogout = async () => {
        try {
            const res = await fetch(`${apiConnection}/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })

            if(!res.ok) {
                console.log('Logout Failed!', res.error)
            } else {
                console.log('Logout successfully')
            }
        }
        catch(error) {
            console.error('Network error', error)
        }
    }

    return (
        <AuthContext.Provider value={{
            loginStatus, setLoginStatus,
            registerStatus, setRegisterStatus,
            loginFormData, setLoginFormData,
            registerFormData, setRegisterFormData,
            postLogin, postRegister, postLogout
         }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider