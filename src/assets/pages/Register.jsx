import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { EmailContext } from '../contexts/EmailContext'

const Register = () => {
    const { registerFormData, setRegisterFormData } = useContext(AuthContext)
    const { postEmail } = useContext(EmailContext)
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()

        const formEmail = registerFormData.email
        const emailSent = await postEmail({ email: formEmail })

        if (emailSent) {
            navigate('/register/verify-email', { state: {formEmail, formData: registerFormData} })
        }
  
        else {
            console.error('Could not send verification email')    
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
              <input type="checkbox"/> <span>I accept</span> <a href='#'>Terms and Conditions</a>
          </div>

          <button type="submit" className="btn btn-register-login">Verify Me</button>
      </form>

      <div className="account-already">
          <p>Already have an account or Google-account?</p><a href='/'>Login here</a>
      </div>
    </div>
  )
}

export default Register