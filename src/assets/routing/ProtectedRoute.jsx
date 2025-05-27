import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext)
  const location = useLocation()

  if (!token) {

    return <Navigate to="/" replace state={{from: location}} />
  }
  
  return children
}

export default ProtectedRoute