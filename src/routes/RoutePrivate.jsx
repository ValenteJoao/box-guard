import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthGoogleContext } from '../contexts/authGoogle'

export default function RoutePrivate({ children }) {
  const { authenticated, loading } = useContext(AuthGoogleContext)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
          <span className="w-2 h-2 bg-foreground rounded-full animate-pulse [animation-delay:.15s]" />
          <span className="w-2 h-2 bg-foreground rounded-full animate-pulse [animation-delay:.3s]" />
          <span className="ml-2">Carregando</span>
        </div>
      </div>
    )
  }

  if (!authenticated) return <Navigate to="/login" />
  return children
}
