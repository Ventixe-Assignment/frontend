import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { validateBlankSpace } from '../helpers/Validation'

const Login = () => {
    const { postLogin, loginStatus, setLoginStatus, loginFormData, setLoginFormData, resetFormData, loading } = useContext(AuthContext)
    const [ errors, setErrors ] = useState({})
    const navigate = useNavigate()
    const resetForm = () => {
        resetFormData()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const fieldErrors = {}

        
        /* Validate blankspaces */ 
        Object.entries(loginFormData).forEach(([name,value]) => {
            if (!validateBlankSpace.test(value)) {
                fieldErrors[name] = "You can not leave this blank"
            }
        }) 
        setErrors(fieldErrors)
        if (Object.keys(fieldErrors).length > 0) return

        var ok = await postLogin()
        
        if (ok) {
            resetForm()
            navigate('/home')
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginFormData(prev => ({...prev, [name]: value }))
        setErrors({})
        setLoginStatus(null)
    } 

    if (loading) {
    return (
        <div className='loading-container'>
            <h2>Login in progress</h2>
            <div className='loading'></div>
        </div>
    )
    }

    return (
        <div>
            <h1 className='create-account-title'>Login</h1>

            <form method="post" onSubmit={handleSubmit} noValidate >
                <div className='shrink'>
                    <div className='input-group'>
                        <label className='form-label' >Email</label>
                        <input className='form-input' type='email' name='email' value={loginFormData.email} onChange={handleChange} required />
                        <small className='validatefield'>{errors.email && errors.email}</small>
                    </div>
                    <div className='input-group'>
                        <label className='form-label'>Password</label>
                        <input className='form-input' type='password' name='password' value={loginFormData.password} onChange={handleChange} required />
                        <small className='validatefield'>{errors.password && errors.password}</small>
                    </div>
                </div>

                <div className='terms'>
                    <input type='checkbox' name='rememberMe' checked={loginFormData.rememberMe} onChange={(e) => {setLoginFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}} />
                    <span>Remember me</span>
                </div>

                <button type="submit" className='btn btn-register-login'>Log in</button>
            </form>

            {loginStatus === 'error' && (
                <div className='validatelogin'>
                    <p>The email or password you entered are incorrect</p>
                </div>
            )}

            <div className='account-already'>
                <p>Don't have an account?</p> <Link to={'/register'} >Go to Register</Link>
            </div>

        </div>
    )
}

export default Login