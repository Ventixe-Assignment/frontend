import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { EmailContext } from '../contexts/EmailContext'
import { AuthContext } from '../contexts/AuthContext'

const VerifyEmail = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const {formEmail, formData} = state || {}
    const { postVerification } = useContext(EmailContext)
    const { postRegister, setRegisterFormData } = useContext(AuthContext)

    const [ searchUrlParams ] = useSearchParams()
    const urlEmail = searchUrlParams.get('email') || ''
    const urlCode = searchUrlParams.get('code') || ''

    const email = formEmail || urlEmail
    const [ code, setCode ] = useState(urlCode || '')
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        const verified = await postVerification({ email, code })

        if (verified) {
            setRegisterFormData({ registerFormData: formData })

            const registered = await postRegister()
            
            if (registered) {
                console.log('Registration of verified user successful!');
                navigate('/')
            }
            else {
                console.error('Registration failed after verification success.')
                navigate('/register')
            }
        }
        else {
            console.error('Verification failed!')
            navigate('/register/verify-email')
        }
    }
  return (
    <div>
        <div className='verify-header'>
            <Link to='/register' className='btn btn-back'>
                <i className="bi bi-arrow-left"></i>
            </Link>
            <h1 className="create-account-title">Go ahead and verify</h1>
        </div>
        <div className='divider'></div>

        {email ? (
            <p className='verify-info'>We sent a code to this email: {email}</p>
        ) : (
            <p className='verify-info'>Email not provided, Please go back and enter your email.</p>            
        )}

        <form className='form-verify' method='post' onSubmit={handleSubmit} noValidate>
            <input className='form-input-verify' maxLength={6} type='text' placeholder='Code' value={code} onChange={(e) => setCode(e.target.value)} required/>
       
            <button className='btn btn-register-login' type='submit'>Register Account</button>
        </form>
    </div>
  )
}

export default VerifyEmail