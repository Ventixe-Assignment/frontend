import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const { postLogout } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        const logout = async () => {
            const result = await postLogout()
    
            if (result)
                navigate('/')    
        }

        logout()
    }, [postLogout, navigate])

  return (
    <div></div>
  )
}

export default Logout