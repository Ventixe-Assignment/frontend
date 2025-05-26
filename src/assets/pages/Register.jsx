import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const { postRegister, registerFormData, setRegisterFormData } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        var ok = await postRegister()

        if (ok) {
            navigate('/')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setRegisterFormData(prev => ({...prev, [name]: value }))
    }


  return (
    <div>
      <h1 className="create-account-title">Create Account</h1>

      <form method="post" onSubmit={handleRegister} noValidate>

          <div className="input-group">
              <label className="form-label">Email</label>
              <input className="form-input" type='email' name='email' value={registerFormData.email} onChange={handleChange} required />
          </div>

          <div className="shrink">
              <div className="input-group">
                  <label className="form-label">Password</label>
                  <input className="form-input" type='password' name='password' value={registerFormData.password} onChange={handleChange} required />
              </div>
              <div className="input-group">
                  <label className="form-label">Confirm Password</label>
                  <input className="form-input" type='password' name='confirmPassword' value={registerFormData.confirmPassword} onChange={handleChange} required />
              </div>
          </div>

          <div className="terms">
              <input type="checkbox"/> <span>I accept</span> <a asp-action="#">Terms and Conditions</a>
          </div>

          <button type="submit" className="btn btn-register-login">Create Account</button>
      </form>

      <div className="account-already">
          <p>Already have an account or Google-account?</p><a href='/'>Login here</a>
      </div>
    </div>
  )
}

export default Register