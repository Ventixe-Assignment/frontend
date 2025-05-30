import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { EmailContext } from '../contexts/EmailContext'
import { validateBlankSpace } from '../helpers/Validation'

const Register = () => {
    const { registerFormData, setRegisterFormData } = useContext(AuthContext)
    const { postEmail } = useContext(EmailContext)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const fieldErrors = {}

        /* Validate blankspaces */ 
        Object.entries(registerFormData).forEach(([name,value]) => {
            if (!validateBlankSpace.test(value)) {
                fieldErrors[name] = "You can not leave this blank"
            }
        })
        setErrors(fieldErrors)
        if (Object.keys(fieldErrors).length > 0) return

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
        setErrors({})
    }

  return (
    <div>
      <h1 className="create-account-title">Create Account</h1>

      <form method="post" onSubmit={handleSubmit} noValidate>

          <div className="input-group">
              <label className="form-label">Email</label>
              <input className="form-input" type='email' name='email' value={registerFormData.email} onChange={handleChange} required />
              <small className='validatefield'>{errors.email && errors.email}</small>
          </div>

          <div className="shrink">
              <div className="input-group">
                  <label className="form-label">Password</label>
                  <input className="form-input" type='password' name='password' placeholder='Req: 1 uppercase, atleast 6 characters' value={registerFormData.password} onChange={handleChange} required />
                  <small className='validatefield'>{errors.password && errors.password}</small>
              </div>
              <div className="input-group">
                  <label className="form-label">Confirm Password</label>
                  <input className="form-input" type='password' name='confirmPassword' placeholder='Type password again...' value={registerFormData.confirmPassword} onChange={handleChange} required />
                  <small className='validatefield'>{errors.confirmPassword && errors.confirmPassword}</small>
              </div>
          </div>

          <div className="terms">
              <input type="checkbox"/> <span>I accept</span> <Link to={'/terms'}>Terms and Conditions</Link>
          </div>

          <button type="submit" className="btn btn-register-login">Verify Me</button>
      </form>

      <div className="account-already">
          <p>Already have an account or Google-account?</p><Link to={'/'}>Login here</Link>
      </div>
    </div>
  )
}

export default Register