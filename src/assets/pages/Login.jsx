import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
const navigate = useNavigate()
const handleLogin = (e) => {
    e.preventDefault()
    navigate('/home')
}
return (
    <div>
        <h1 className='create-account-title'>Login</h1>

        <form method="post" novalidate>

            <button type="submit" name="provider" value="Google" className="btn btn-external-login">
                <img src="./icons/google-icon.svg" alt="Google-Icon" />
                Login with Google
            </button>

            <div className="text-line">
                <span>OR</span>
            </div>
        </form>

        <form method="post" novalidate>
            <div className='shrink'>
                <div className='input-group'>
                    <label className='form-label'>Email</label>
                    <input className='form-input'/>
                </div>
                <div className='input-group'>
                    <label className='form-label'>Password</label>
                    <input className='form-input'/>
                </div>
            </div>

            <div className='terms'>
                <input type='checkbox' /> <span>Remember me</span>
            </div>

            <button type="submit" onClick={handleLogin} className='btn btn-register-login'>Log in</button>
        </form>

        <div className='account-already'>
            <p>Don't have an account?</p> <a href='/register' >Go to Register</a>
        </div>
    </div>
    )
}

export default Login