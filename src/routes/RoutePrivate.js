import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthGoogleContext } from '../contexts/authGoogle'

function RoutePrivate({ children }) {

  const { authenticated, loading } = useContext(AuthGoogleContext);

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!authenticated) {
    return <Navigate to="/login" />
  }
  return children;
}

export default RoutePrivate