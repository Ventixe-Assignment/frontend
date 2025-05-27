import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'

const ProtectedRoute = ({ children }) => {
  const { token, user, getUser } = useContext(AuthContext)
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      if (!user) {
        const success = await getUser()
        if (!success) {
          localStorage.removeItem('token')
        }
      }

      setLoading(false)
    }

    verifyUser()
  }, [token])

  if (loading) {
    return (
      <div>
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    )
  }

  if (!token || !user) {

    return <Navigate to="/" replace state={{from: location}} />
  }
  
  return children
}

export default ProtectedRoute