
import React, { useContext } from 'react'
import { Outlet, Navigate } from "react-router-dom"
import { AuthenticationContext } from '../context/AuthenticationContext'

const PrivateRoute = () => {
  const { tokens } = useContext(AuthenticationContext)

  return (
    <div>
      {tokens.access != "" ? <Outlet /> : <Navigate to="/" />}
    </div>
  )
}

export default PrivateRoute