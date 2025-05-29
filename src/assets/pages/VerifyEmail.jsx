import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { EmailContext } from '../contexts/EmailContext'
import { AuthContext } from '../contexts/AuthContext'

const VerifyEmail = () => {
    const { state } = useLocation()
    const {email, formData} = state || {}
    const [ code, setCode ] = useState('')
    const { postVerify } = useContext(EmailContext)
    const { postRegister, setRegisterFormData } = useContext(AuthContext)
    const navigate = useNavigate()

    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const verified = await postVerify({ email, code })

        if (verified) {
            setRegisterFormData(formData)

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
        <h1>Go ahead and verify</h1>
        <p>We sent a code to this email {email}</p>

        <form onSubmit={handleSubmit} noValidate>

            <input type='text' placeholder='Enter the code from email' value={code} onChange={(e) => setCode(e.target.value)} required/>

            <button type='submit'>Register Account</button>
        </form>
    </div>
  )
}

export default VerifyEmail