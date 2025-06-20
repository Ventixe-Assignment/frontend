import React, { createContext, useCallback, useState } from "react";
export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const apiConnection = `https://authservice-dmefe0b8adg2hvek.swedencentral-01.azurewebsites.net/api/authentications`
    const [user, setUser] = useState()
    const [loginStatus, setLoginStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const [registerStatus, setRegisterStatus] = useState(null)
    const [loginFormData,setLoginFormData] = useState({ email: '', password: '', rememberMe: false })
    const [registerFormData, setRegisterFormData] = useState({ email: '', password: '', confirmPassword: '' })
    const [token, setToken] = useState(localStorage.getItem('token') || null)

    const resetFormData = () => {
        setLoginFormData({ email: "", password: "", rememberMe: false })
    }

    const getUser = useCallback(async () => {
        if (!token) return
        if (user) return

        try {
            setLoading(true)
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
                console.log('User fetched Successfully')
                setUser(data)
                return true
            }
        }
        catch(error) {
            console.error('Error during fetching user attempt', error)
            return false
        }
        finally {
            setLoading(false)
        }

    }, [token])

    const postLogin = async () => {
        setLoading(true)
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
                console.log('Login successful, but token not saved!');
                setLoginStatus('error')
                return false
            }
        }
        catch(error) {
            console.error('Error during login attempt', error)
            setLoginStatus('error')
            return false
        }
        finally {
            setLoading(false)
        }
    }

    const postRegister = async (formData) => {
        setLoading(true)
        try {
            const res = await fetch(`${apiConnection}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if(!res.ok) {
                console.log('Registration Failed!')
                setRegisterStatus('error')
                return false
   
            } else {
                console.log('Account created successfully')
                setRegisterStatus('success')
                return true
   
            }
        }
        catch(error) {
            console.error('Error during registration attempt', error)
            setRegisterStatus('error')
            return false
        }
        finally {
            setLoading(false)
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
            user, getUser, loading,
            postLogin, postRegister, postLogout,
            resetFormData
         }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider