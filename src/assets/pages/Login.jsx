import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Login = () => {
    const { postLogin, loginStatus, setLoginStatus, loginFormData, setLoginFormData, resetFormData } = useContext(AuthContext)
    const navigate = useNavigate()
    
    const resetForm = () => {
        resetFormData()
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        var ok = await postLogin()
        
        if (ok) {
            resetForm()
            navigate('/home')
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginFormData(prev => ({...prev, [name]: value }))
        setLoginStatus(null)
    } 

return (
    <div>
        <h1 className='create-account-title'>Login</h1>

        <form method="post" noValidate>
            <button type="submit" name="provider" value="Google" className="btn btn-external-login">
                <img src="./icons/google-icon.svg" alt="Google-Icon" />
                Login with Google
            </button>

            <div className="text-line">
                <span>OR</span>
            </div>
        </form>

        <form method="post" onSubmit={handleLogin} noValidate >
            <div className='shrink'>
                <div className='input-group'>
                    <label className='form-label' >Email</label>
                    <input className='form-input' type='email' name='email' value={loginFormData.email} onChange={handleChange} required />
                </div>
                <div className='input-group'>
                    <label className='form-label'>Password</label>
                    <input className='form-input' type='password' name='password' value={loginFormData.password} onChange={handleChange} required />
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
            <p>Don't have an account?</p> <a href='/register' >Go to Register</a>
        </div>
    </div>
    )
}

export default Login