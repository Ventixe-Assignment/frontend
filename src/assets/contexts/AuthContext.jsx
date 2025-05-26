import React, { createContext, useState } from "react";
export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const apiConnection = `https://authservice-dmefe0b8adg2hvek.swedencentral-01.azurewebsites.net/api/authentications`
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [loginStatus, setLoginStatus] = useState(null)
    const [registerStatus, setRegisterStatus] = useState(null)
    const [user, setUser] = useState()
    const [loginFormData,setLoginFormData] = useState({ email: '', password: '', rememberMe: false })
    const [registerFormData, setRegisterFormData] = useState({ email: '', password: '', confirmPassword: '' })

    const resetFormData = () => {
        setLoginFormData({ email: "", password: "", rememberMe: false })
    }

    const getUser = async () => {
        try {

            const res = await fetch(`${apiConnection}/user`, {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}`
                 }
            })

            if(!res.ok) {
                console.log('Fetching user Failed!')
                return false
   
            } else {
                const data = await res.json()
                console.log('User fetched Successfully', data)
                setUser(data)
                return true
            }
        }
        catch(error) {
            console.error('Error during fetching user attempt', error)
            return false
        }
    }
    

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
            } 
            
            const data = await res.json()

            if (data.token) {
                localStorage.setItem('token', data.token)
                setToken(data.token)
                console.log('Login Successful, and token saved locally')
                setLoginStatus('success')
                return true

            } else {
                console.log('Login successfull, but token not saved!');
                setLoginStatus('error')
                return false
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
                return false
            } else {
                localStorage.removeItem('token');
                setToken(null)
                console.log('Logout successfully')
                return true
            }
        }
        catch(error) {
            console.error('Network error', error)
            return false
        }
    }

    return (
        <AuthContext.Provider value={{
            token, setToken,
            loginStatus, setLoginStatus,
            registerStatus, setRegisterStatus,
            loginFormData, setLoginFormData,
            registerFormData, setRegisterFormData,
            user, getUser,
            postLogin, postRegister, postLogout,
            resetFormData
         }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider